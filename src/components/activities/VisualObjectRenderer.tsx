import React from 'react';
import { VisualObjectId } from '../../types';

interface Props {
  objectId: VisualObjectId;
  rotation?: { x: number; y: number };
  className?: string;
  isInspecting?: boolean;
}

export const VisualObjectRenderer: React.FC<Props> = ({
  objectId,
  rotation = { x: 10, y: -15 },
  className = '',
  isInspecting = false
}) => {
  return (
    <div 
      className={`relative flex items-center justify-center select-none transition-transform duration-300 ease-out ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center transition-transform duration-200"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Soft 3D Ground Shadow */}
        <div 
          className="absolute -bottom-2 w-36 h-8 bg-slate-900/15 rounded-full blur-md"
          style={{ transform: 'rotateX(80deg) translateZ(-40px)' }}
        />

        {/* 1. APPLE */}
        {objectId === 'apple' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <radialGradient id="appleBody" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="40%" stopColor="#e02424" />
                <stop offset="85%" stopColor="#9b1c1c" />
                <stop offset="100%" stopColor="#63171b" />
              </radialGradient>
              <linearGradient id="appleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84e1bc" />
                <stop offset="60%" stopColor="#0e9f6e" />
                <stop offset="100%" stopColor="#03543f" />
              </linearGradient>
            </defs>
            {/* Apple Stem */}
            <path d="M100 48 C102 30, 115 22, 122 18" stroke="#5c3d2e" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Apple Leaf */}
            <path d="M104 36 C125 24, 142 35, 145 42 C145 52, 125 56, 104 36 Z" fill="url(#leafGrad)" />
            <path d="M106 38 C120 38, 134 42, 142 42" stroke="#046c4e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Apple Main Body (3D Heart-round shape) */}
            <path d="M100 56 C75 38, 38 48, 38 88 C38 128, 68 172, 100 178 C132 172, 162 128, 162 88 C162 48, 125 38, 100 56 Z" fill="url(#appleBody)" />
            {/* Specular 3D Highlight Glare */}
            <ellipse cx="68" cy="78" rx="22" ry="32" transform="rotate(-25 68 78)" fill="url(#appleHighlight)" />
            <ellipse cx="82" cy="64" rx="7" ry="10" transform="rotate(-20 82 64)" fill="#ffffff" opacity="0.6" />
          </svg>
        )}

        {/* 2. COFFEE MUG */}
        {objectId === 'coffee' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="mugBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="35%" stopColor="#6366f1" />
                <stop offset="70%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#3730a3" />
              </linearGradient>
              <radialGradient id="coffeeLiquid" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="60%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
            </defs>
            {/* Rising Steam Waves */}
            <path d="M85 35 Q95 20, 85 8" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" className="animate-pulse" />
            <path d="M105 32 Q115 15, 105 5" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" className="animate-pulse" />
            <path d="M125 37 Q135 22, 125 10" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" className="animate-pulse" />
            {/* Mug Handle */}
            <path d="M135 75 C175 75, 175 140, 135 140" stroke="#4f46e5" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M135 75 C170 75, 170 140, 135 140" stroke="#6366f1" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Mug Outer Cylinder Body */}
            <rect x="55" y="60" width="90" height="95" rx="14" fill="url(#mugBody)" />
            {/* Mug Base Curved Bottom */}
            <ellipse cx="100" cy="155" rx="45" ry="14" fill="#312e81" />
            {/* Mug Top Rim Opening */}
            <ellipse cx="100" cy="60" rx="45" ry="14" fill="#818cf8" />
            {/* Coffee Liquid Layer */}
            <ellipse cx="100" cy="62" rx="40" ry="11" fill="url(#coffeeLiquid)" />
            {/* Foam heart accent */}
            <path d="M100 64 C96 59, 90 61, 90 65 C90 70, 100 74, 100 74 C100 74, 110 70, 110 65 C110 61, 104 59, 100 64 Z" fill="#fef3c7" opacity="0.9" />
          </svg>
        )}

        {/* 3. AIRPLANE */}
        {objectId === 'airplane' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl animate-float-slow">
            <defs>
              <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            {/* Back Wing */}
            <polygon points="120,80 165,40 155,35 110,75" fill="#64748b" />
            {/* Left Engine */}
            <rect x="75" y="115" width="22" height="10" rx="5" fill="#334155" />
            {/* Main Fuselage Body (Tilted forward 3D jet) */}
            <path d="M40 145 C65 130, 150 70, 175 50 C182 45, 185 48, 178 58 C155 90, 85 160, 65 170 C50 178, 30 160, 40 145 Z" fill="url(#fuselageGrad)" />
            {/* Cockpit Windshield */}
            <polygon points="160,56 172,50 168,60 156,64" fill="#0284c7" />
            {/* Passenger Windows */}
            <circle cx="140" cy="74" r="2.5" fill="#0284c7" />
            <circle cx="128" cy="83" r="2.5" fill="#0284c7" />
            <circle cx="116" cy="92" r="2.5" fill="#0284c7" />
            <circle cx="104" cy="101" r="2.5" fill="#0284c7" />
            <circle cx="92" cy="110" r="2.5" fill="#0284c7" />
            {/* Main Front Wing */}
            <polygon points="90,105 45,155 35,145 95,95" fill="url(#wingGrad)" />
            {/* Tail Vertical Fin */}
            <polygon points="50,155 35,185 45,185 68,160" fill="#0284c7" />
          </svg>
        )}

        {/* 4. HEADPHONES */}
        {objectId === 'headphones' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="headband" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="cupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {/* Curved Overhead Band */}
            <path d="M48 110 C48 45, 152 45, 152 110" stroke="url(#headband)" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Metallic Headband Cushion */}
            <path d="M65 80 C80 55, 120 55, 135 80" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            {/* Left Ear Cup Shell */}
            <ellipse cx="44" cy="115" rx="18" ry="28" fill="url(#cupGrad)" transform="rotate(-10 44 115)" />
            <ellipse cx="44" cy="115" rx="12" ry="20" fill="#1e293b" transform="rotate(-10 44 115)" />
            {/* Right Ear Cup Shell */}
            <ellipse cx="156" cy="115" rx="18" ry="28" fill="url(#cupGrad)" transform="rotate(10 156 115)" />
            <ellipse cx="156" cy="115" rx="12" ry="20" fill="#1e293b" transform="rotate(10 156 115)" />
            {/* Audio Wave Glow pulses */}
            <path d="M20 100 Q15 115, 20 130" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" className="animate-pulse" />
            <path d="M180 100 Q185 115, 180 130" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" className="animate-pulse" />
          </svg>
        )}

        {/* 5. BACKPACK */}
        {objectId === 'backpack' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="packBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="60%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* Top Carry Loop */}
            <path d="M85 45 C85 28, 115 28, 115 45" stroke="#065f46" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Main Backpack Body */}
            <rect x="52" y="45" width="96" height="115" rx="28" fill="url(#packBody)" />
            {/* Top Zipper Flap */}
            <path d="M54 75 Q100 85, 146 75" stroke="#f59e0b" strokeWidth="4" fill="none" />
            {/* Front Utility Pocket */}
            <rect x="68" y="95" width="64" height="52" rx="14" fill="url(#pocketGrad)" />
            <path d="M70 105 H130" stroke="#f59e0b" strokeWidth="3" />
            {/* Leather Buckle Straps */}
            <rect x="78" y="65" width="8" height="55" rx="4" fill="#78350f" />
            <rect x="114" y="65" width="8" height="55" rx="4" fill="#78350f" />
            <rect x="76" y="92" width="12" height="6" rx="2" fill="#fbbf24" />
            <rect x="112" y="92" width="12" height="6" rx="2" fill="#fbbf24" />
          </svg>
        )}

        {/* 6. ELECTRIC CAR */}
        {objectId === 'car' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="windshield" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            {/* Car Chassis / Roofline */}
            <path d="M35 125 L48 95 Q65 72, 105 72 Q145 72, 160 95 L175 125 Q180 135, 168 135 L38 135 Q28 135, 35 125 Z" fill="url(#carBody)" />
            {/* Windshield & Windows */}
            <path d="M60 95 Q72 80, 100 80 L100 95 Z" fill="url(#windshield)" />
            <path d="M106 80 Q130 80, 142 95 L106 95 Z" fill="url(#windshield)" />
            {/* Headlights (Glowing Yellow) */}
            <circle cx="168" cy="115" r="5" fill="#fde047" className="animate-pulse" />
            {/* Wheels & Tires */}
            <circle cx="65" cy="138" r="18" fill="#1e293b" />
            <circle cx="65" cy="138" r="10" fill="#cbd5e1" />
            <circle cx="65" cy="138" r="4" fill="#3b82f6" />
            <circle cx="140" cy="138" r="18" fill="#1e293b" />
            <circle cx="140" cy="138" r="10" fill="#cbd5e1" />
            <circle cx="140" cy="138" r="4" fill="#3b82f6" />
          </svg>
        )}

        {/* 7. ALARM CLOCK */}
        {objectId === 'clock' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <radialGradient id="clockFace" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </radialGradient>
              <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {/* Clock Legs */}
            <line x1="65" y1="150" x2="45" y2="175" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <line x1="135" y1="150" x2="155" y2="175" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            {/* Twin Bells */}
            <path d="M45 60 C35 38, 65 25, 75 45 Z" fill="url(#bellGrad)" stroke="#b45309" strokeWidth="2" />
            <path d="M155 60 C165 38, 135 25, 125 45 Z" fill="url(#bellGrad)" stroke="#b45309" strokeWidth="2" />
            {/* Top Hammer handle */}
            <rect x="96" y="32" width="8" height="18" rx="4" fill="#64748b" />
            {/* Main Clock Outer Ring */}
            <circle cx="100" cy="105" r="58" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="4" />
            {/* Clock Inner Face */}
            <circle cx="100" cy="105" r="48" fill="url(#clockFace)" />
            {/* Hour & Minute Ticks */}
            <circle cx="100" cy="65" r="3" fill="#1e293b" />
            <circle cx="140" cy="105" r="3" fill="#1e293b" />
            <circle cx="100" cy="145" r="3" fill="#1e293b" />
            <circle cx="60" cy="105" r="3" fill="#1e293b" />
            {/* Clock Hands pointing to 10:10 */}
            <line x1="100" y1="105" x2="80" y2="85" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="105" x2="122" y2="80" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="100" cy="105" r="5" fill="#ef4444" />
          </svg>
        )}

        {/* 8. BOOKS STACK */}
        {objectId === 'books' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            {/* Bottom Book (Blue Hardcover) */}
            <path d="M40 140 L160 140 L150 162 L30 162 Z" fill="#1d4ed8" />
            <path d="M40 140 L160 140 L160 148 L40 148 Z" fill="#93c5fd" />
            <rect x="30" y="152" width="125" height="10" rx="3" fill="#1e40af" />
            {/* Middle Book (Emerald) */}
            <path d="M45 118 L155 118 L148 138 L38 138 Z" fill="#047857" />
            <path d="M45 118 L155 118 L155 125 L45 125 Z" fill="#a7f3d0" />
            <rect x="38" y="128" width="112" height="10" rx="3" fill="#065f46" />
            {/* Top Book (Ruby Red, slightly tilted) */}
            <path d="M50 95 L145 95 L140 115 L45 115 Z" fill="#dc2626" />
            <path d="M50 95 L145 95 L145 102 L50 102 Z" fill="#fecaca" />
            <rect x="45" y="105" width="98" height="10" rx="3" fill="#991b1b" />
            {/* Hanging Golden Bookmark Ribbon */}
            <path d="M110 95 L110 135 L116 128 L122 135 L122 95 Z" fill="#f59e0b" />
          </svg>
        )}

        {/* 9. BICYCLE */}
        {objectId === 'bicycle' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            {/* Back Wheel */}
            <circle cx="55" cy="130" r="28" stroke="#334155" strokeWidth="6" fill="none" />
            <circle cx="55" cy="130" r="6" fill="#0284c7" />
            <line x1="55" y1="102" x2="55" y2="158" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="27" y1="130" x2="83" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Front Wheel */}
            <circle cx="145" cy="130" r="28" stroke="#334155" strokeWidth="6" fill="none" />
            <circle cx="145" cy="130" r="6" fill="#0284c7" />
            <line x1="145" y1="102" x2="145" y2="158" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="117" y1="130" x2="173" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Frame Tubes */}
            <polygon points="55,130 95,130 130,95 90,95" stroke="#0284c7" strokeWidth="5" fill="none" strokeLinejoin="round" />
            <line x1="55" y1="130" x2="85" y2="85" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <line x1="145" y1="130" x2="132" y2="78" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            {/* Saddle / Seat */}
            <rect x="75" y="82" width="22" height="6" rx="3" fill="#1e293b" />
            {/* Handlebars */}
            <path d="M125 78 H142 L146 84" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Pedals & Chain Ring */}
            <circle cx="95" cy="130" r="8" fill="#64748b" />
            <line x1="95" y1="130" x2="102" y2="142" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}

        {/* 10. HOUSE */}
        {objectId === 'house' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            {/* Chimney */}
            <rect x="125" y="45" width="16" height="32" fill="#78350f" />
            <ellipse cx="133" cy="45" rx="8" ry="3" fill="#451a03" />
            {/* Main Walls Body */}
            <rect x="55" y="95" width="90" height="70" rx="4" fill="url(#wallGrad)" />
            {/* Roof Triangle */}
            <polygon points="100,45 42,98 158,98" fill="url(#roofGrad)" />
            {/* Wooden Front Door */}
            <rect x="88" y="125" width="24" height="40" rx="3" fill="#78350f" />
            <circle cx="106" cy="145" r="2.5" fill="#fde047" />
            {/* Left Window with Glass Pane */}
            <rect x="65" y="112" width="18" height="18" rx="2" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <line x1="74" y1="112" x2="74" y2="130" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="65" y1="121" x2="83" y2="121" stroke="#ffffff" strokeWidth="1.5" />
            {/* Right Window */}
            <rect x="117" y="112" width="18" height="18" rx="2" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <line x1="126" y1="112" x2="126" y2="130" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="117" y1="121" x2="135" y2="121" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        )}

        {/* 11. PENCIL */}
        {objectId === 'pencil' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="pencilShaft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="eraserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            <g transform="rotate(-38 100 100)">
              {/* Pink Eraser */}
              <rect x="90" y="24" width="20" height="24" rx="6" fill="url(#eraserGrad)" />
              {/* Silver Ferrule Band */}
              <rect x="89" y="44" width="22" height="18" rx="2" fill="#94a3b8" />
              <line x1="89" y1="50" x2="111" y2="50" stroke="#64748b" strokeWidth="2" />
              <line x1="89" y1="56" x2="111" y2="56" stroke="#64748b" strokeWidth="2" />
              {/* Yellow Pencil Shaft (Hexagonal facets) */}
              <rect x="90" y="62" width="20" height="85" fill="url(#pencilShaft)" />
              <line x1="97" y1="62" x2="97" y2="147" stroke="#b45309" strokeWidth="1.5" />
              <line x1="104" y1="62" x2="104" y2="147" stroke="#fef08a" strokeWidth="1.5" />
              {/* Sharpened Wooden Tip */}
              <polygon points="90,147 110,147 100,175" fill="#fde68a" />
              {/* Dark Graphite Lead Tip */}
              <polygon points="97,166 103,166 100,175" fill="#1e293b" />
            </g>
          </svg>
        )}

        {/* 12. MICROSCOPE */}
        {objectId === 'microscope' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="steelArm" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="scopeTube" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            {/* Horseshoe Base */}
            <path d="M50 168 C50 156, 150 156, 150 168 L142 178 C142 182, 58 182, 58 178 Z" fill="#1e293b" />
            <ellipse cx="100" cy="168" rx="42" ry="10" fill="#334155" />
            {/* Mirror / Light Source */}
            <ellipse cx="98" cy="144" rx="14" ry="7" fill="#93c5fd" stroke="#475569" strokeWidth="2" />
            {/* Curved Arm */}
            <path d="M115 160 C145 140, 145 75, 115 65" stroke="url(#steelArm)" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Stage Plate */}
            <rect x="68" y="120" width="60" height="8" rx="3" fill="#0f172a" />
            {/* Slide Glass with Sample Dot */}
            <rect x="80" y="117" width="36" height="4" rx="1" fill="#bae6fd" opacity="0.9" />
            <circle cx="98" cy="119" r="2" fill="#ef4444" />
            {/* Coarse Adjustment Knobs */}
            <circle cx="132" cy="100" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <circle cx="132" cy="100" r="5" fill="#64748b" />
            {/* Body Tube (Tilted) */}
            <g transform="rotate(18 95 75)">
              <rect x="88" y="25" width="18" height="48" rx="4" fill="url(#scopeTube)" />
              {/* Eyepiece */}
              <rect x="84" y="16" width="26" height="12" rx="3" fill="#1e293b" />
              <ellipse cx="97" cy="16" rx="10" ry="3" fill="#38bdf8" />
              {/* Revolving Nosepiece */}
              <circle cx="97" cy="74" r="14" fill="#1e293b" />
              {/* Objective Lenses */}
              <rect x="88" y="84" width="7" height="16" rx="2" fill="#cbd5e1" />
              <rect x="99" y="84" width="8" height="20" rx="2" fill="#f59e0b" />
            </g>
          </svg>
        )}

        {/* 13. GLOBE */}
        {objectId === 'globe' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <radialGradient id="oceanGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </radialGradient>
            </defs>
            {/* Stand Base */}
            <ellipse cx="100" cy="172" rx="38" ry="10" fill="#334155" />
            <rect x="96" y="148" width="8" height="26" fill="#64748b" />
            {/* Meridian Arc Ring */}
            <path d="M52 100 C52 45, 148 45, 148 100 C148 135, 125 158, 100 158" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" fill="none" transform="rotate(-23.5 100 100)" />
            {/* Sphere Globe Body */}
            <g transform="rotate(-23.5 100 100)">
              <circle cx="100" cy="100" r="46" fill="url(#oceanGrad)" />
              {/* Latitude / Longitude grid lines */}
              <ellipse cx="100" cy="100" rx="46" ry="18" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
              <line x1="100" y1="54" x2="100" y2="146" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
              {/* Green Continents Silhouette */}
              <path d="M85 75 Q95 70, 105 78 Q115 85, 108 95 Q98 100, 90 92 Z" fill="#10b981" />
              <path d="M110 95 Q125 90, 132 105 Q125 120, 115 115 Z" fill="#10b981" />
              <path d="M75 105 Q85 100, 92 115 Q82 128, 72 120 Z" fill="#10b981" />
              {/* Specular Glare */}
              <ellipse cx="85" cy="80" rx="14" ry="20" fill="#ffffff" opacity="0.25" transform="rotate(-25 85 80)" />
            </g>
          </svg>
        )}

        {/* 14. GUITAR */}
        {objectId === 'guitar' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <radialGradient id="guitarBody" cx="45%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="45%" stopColor="#d97706" />
                <stop offset="85%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
            </defs>
            <g transform="rotate(-30 100 100)">
              {/* Long Fretboard Neck */}
              <rect x="94" y="22" width="12" height="75" fill="#451a03" />
              {/* Headstock */}
              <polygon points="92,12 108,12 107,24 93,24" fill="#78350f" />
              {/* Tuning Pegs */}
              <circle cx="88" cy="15" r="2.5" fill="#fbbf24" />
              <circle cx="88" cy="21" r="2.5" fill="#fbbf24" />
              <circle cx="112" cy="15" r="2.5" fill="#fbbf24" />
              <circle cx="112" cy="21" r="2.5" fill="#fbbf24" />
              {/* Frets Wire */}
              <line x1="94" y1="35" x2="106" y2="35" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="94" y1="50" x2="106" y2="50" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="94" y1="65" x2="106" y2="65" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="94" y1="80" x2="106" y2="80" stroke="#cbd5e1" strokeWidth="1" />
              {/* Hourglass Acoustic Body */}
              <path d="M100 90 C120 90, 130 102, 126 116 C122 126, 134 140, 132 154 C130 172, 115 178, 100 178 C85 178, 70 172, 68 154 C66 140, 78 126, 74 116 C70 102, 80 90, 100 90 Z" fill="url(#guitarBody)" />
              {/* Soundhole Ring & Rosette */}
              <circle cx="100" cy="124" r="14" fill="#1e293b" stroke="#fde68a" strokeWidth="2.5" />
              {/* Wooden Bridge */}
              <rect x="90" y="152" width="20" height="7" rx="2" fill="#1e293b" />
              {/* 6 Steel Strings */}
              <line x1="97" y1="22" x2="97" y2="154" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <line x1="100" y1="22" x2="100" y2="154" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <line x1="103" y1="22" x2="103" y2="154" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
            </g>
          </svg>
        )}

        {/* 15. TELESCOPE */}
        {objectId === 'telescope' && (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-float-slow">
            <defs>
              <linearGradient id="telescopeTube" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="45%" stopColor="#3b82f6" />
                <stop offset="85%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            {/* Tripod Legs */}
            <line x1="100" y1="125" x2="52" y2="182" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="125" x2="100" y2="186" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="125" x2="148" y2="182" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            {/* Tripod Mounting Head & Joint */}
            <circle cx="100" cy="125" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            {/* Main Optical Tube Tilted towards Stars (40 deg) */}
            <g transform="rotate(-40 100 115)">
              {/* Wide Front Objective Hood */}
              <rect x="75" y="32" width="50" height="20" rx="5" fill="#1e293b" />
              <ellipse cx="100" cy="32" rx="25" ry="8" fill="#38bdf8" />
              <ellipse cx="100" cy="32" rx="20" ry="5" fill="#7dd3fc" opacity="0.6" />
              {/* Main Barrel Cylinder */}
              <rect x="80" y="50" width="40" height="85" rx="4" fill="url(#telescopeTube)" />
              {/* Gold Accent Ring */}
              <rect x="79" y="85" width="42" height="6" fill="#fbbf24" />
              {/* Eyepiece Diagonal Mount */}
              <rect x="88" y="135" width="24" height="20" rx="3" fill="#1e293b" />
              <rect x="94" y="155" width="12" height="18" rx="2" fill="#cbd5e1" />
              {/* Finder Scope attached on top */}
              <rect x="68" y="60" width="10" height="35" rx="3" fill="#0f172a" />
              <circle cx="73" cy="60" r="6" fill="#38bdf8" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
