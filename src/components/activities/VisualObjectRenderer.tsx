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
      </div>
    </div>
  );
};
