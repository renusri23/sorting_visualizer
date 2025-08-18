import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { computeFrames } from "../utils/algorithms";

/**
 * Clean 3D visualizer:
 * - Normalizes bar heights to maxBarHeight (so they never explode).
 * - Play/Pause/Reset/Shuffle/S peed.
 * - Highlights comparisons and done indices.
 * - Dark/Light scene background.
 */
function SortingVisualizer({ selectedAlgo, arraySize, setSteps, setStats, darkMode }) {
  const mountRef = useRef(null);
  const barsRef = useRef([]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const intervalRef = useRef(null);

  const [array, setArray] = useState([]);
  const [frames, setFrames] = useState([]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(120);

  const maxBarHeight = 42; // world units (safe height)

  const generateArray = useCallback(() => {
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 95) + 5); // 5..100
    setArray(arr);
    setFrames([]);
    setFrameIdx(0);
    setSteps([]);
    setStats(null);
    setIsPlaying(false);
  }, [arraySize, setSteps, setStats]);

  useEffect(() => { generateArray(); }, [arraySize, generateArray]);

  // build scene once
  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(darkMode ? "#0b1220" : "#f5f7fb");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 55, 95);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controlsRef.current = controls;

    // lights + grid
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(40, 80, 50);
    scene.add(dir);

    const grid = new THREE.GridHelper(250, 25, 0x999999, 0xcccccc);
    grid.material.opacity = darkMode ? 0.12 : 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once

  // (re)create bars whenever array changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // remove previous
    barsRef.current.forEach((b) => sceneRef.current.remove(b));
    barsRef.current = [];

    const spacing = 2.1;
    array.forEach((val, i) => {
      const geom = new THREE.BoxGeometry(1.6, 1, 1.6); // start unit height
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${(i / Math.max(1, array.length)) * 360}, 85%, 55%)`),
        roughness: 0.35,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geom, mat);
      const h = normalize(val, array, maxBarHeight);
      mesh.scale.y = h;            // height
      mesh.position.set(
        i * spacing - (array.length * spacing) / 2 + spacing / 2,
        h / 2,
        0
      );
      mesh.userData = { baseColor: mat.color.clone() };
      sceneRef.current.add(mesh);
      barsRef.current.push(mesh);
    });
  }, [array]);

  // normalize 0..max(array) to 3..maxBarHeight
  function normalize(v, arr, maxH) {
    const max = Math.max(...arr, 1);
    const vh = (v / max) * (maxH - 3) + 3;
    return Math.max(1, vh);
  }

  // prep frames + logs + stats, and set initial frame
  const prepareFrames = useCallback(() => {
    if (!array?.length) return;
    const start = performance.now();
    const { frames: fr, logs, stats } = computeFrames(selectedAlgo, array);
    const end = performance.now();
    setFrames(fr);
    setSteps(logs);
    setStats({ ...stats, timeMs: Math.max(1, Math.round(end - start)) });
    setFrameIdx(0);
    if (fr.length) applyFrame(fr[0]); // show initial
  }, [array, selectedAlgo, setSteps, setStats]);

  // apply frame → update bar heights, positions, colors
  const applyFrame = useCallback((frame) => {
    if (!frame || !barsRef.current?.length) return;
    const { array: arr, highlight = [], done = [] } = frame;

    const spacing = 2.1;
    const max = Math.max(...arr, 1);

    // heights & x positions
    arr.forEach((v, i) => {
      const bar = barsRef.current[i];
      if (!bar) return;
      const h = (v / max) * (maxBarHeight - 3) + 3;
      bar.scale.y = h;
      bar.position.y = h / 2;
      bar.position.x = i * spacing - (arr.length * spacing) / 2 + spacing / 2;
    });

    // reset colors
    barsRef.current.forEach((bar) => {
      bar.material.color.copy(bar.userData.baseColor);
    });

    // highlight comparisons/swaps in red
    highlight.forEach((i) => {
      const b = barsRef.current[i];
      if (b) b.material.color.set("#ef4444");
    });

    // mark sorted/done in green
    done.forEach((i) => {
      const b = barsRef.current[i];
      if (b) b.material.color.set("#10b981");
    });
  }, []);

  // play/pause ticker
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (!frames.length) return;

    intervalRef.current = setInterval(() => {
      setFrameIdx((idx) => {
        const next = idx + 1;
        const f = frames[next];
        if (f) applyFrame(f);
        if (next >= frames.length - 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return frames.length - 1;
        }
        return next;
      });
    }, Math.max(16, speedMs));

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, frames, speedMs, applyFrame]);

  // theme change → scene bg
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(darkMode ? "#0b1220" : "#f5f7fb");
    }
  }, [darkMode]);
  

  return (
    <div className="canvas-wrap">
      <div className="canvas-header">
        <button className="control-btn secondary" onClick={generateArray}>Shuffle</button>

        <button
          className="control-btn"
          onClick={() => {
            prepareFrames();
            setIsPlaying(true);
          }}
        >
          Play
        </button>

        <button
          className="control-btn warning"
          onClick={() => setIsPlaying(false)}
        >
          Pause
        </button>

        <button
          className="control-btn secondary"
          onClick={() => {
            if (frames.length) {
              setIsPlaying(false);
              setFrameIdx(0);
              applyFrame(frames[0]);
            } else {
              // if not prepared yet, just reset bars to current array
              setIsPlaying(false);
              setFrameIdx(0);
              setSteps([]);
              setStats(null);
              // redraw current array
              const first = { array, highlight: [] };
              applyFrame(first);
            }
          }}
        >
          Reset
        </button>

        <label style={{ marginLeft: 10, fontSize: 14 }}>Speed</label>
        <input
          type="range"
          min="5"
          max="600"
          value={speedMs}
          onChange={(e) => setSpeedMs(Number(e.target.value))}
          style={{ width: 140 }}
        />
        <span style={{ fontSize: 12, opacity: 0.8 }}>{speedMs}ms</span>
      </div>

      <div ref={mountRef} className="canvas-area" />
    </div>
  );
}

export default SortingVisualizer;
