import React, { useId } from 'react';
import { ChibiAction, ChibiExpression, Student } from '../types';

interface ChibiCharacterSVGProps {
  student: Student;
  expression?: ChibiExpression;
  action?: ChibiAction;
  holdingFlower?: boolean;
  animTime?: number; // seconds for smooth procedural motion
  facing?: 'left' | 'right' | 'front';
  className?: string;
}

/**
 * High-end 2D Animated Chibi Mascot wearing soft pastel Ca Dong traditional attire.
 * - Head = ~43% of total height, plump soft cheeks, luminous layered eyes.
 * - Fine warm-sepia outlines (never thick harsh black), pastel gradients & soft shading.
 * - 6 consistent fluffy hairstyles, 7 live facial expressions, rounded hands & feet.
 */
export const ChibiCharacterSVG: React.FC<ChibiCharacterSVGProps> = ({
  student,
  expression = 'happy',
  action = 'idle',
  holdingFlower = false,
  animTime = 0,
  facing = 'front',
  className = 'w-full h-full',
}) => {
  const uid = useId().replace(/:/g, '');
  const line = '#5b4238'; // Soft warm sepia outline

  // Procedural smooth cycle offsets
  const isRunning = action === 'run' || expression === 'running';
  const isWavingGreet = action === 'wave_greet';
  const isBowingGreet = action === 'bow_greet';
  const isWaving = expression === 'waving' || action === 'inside_yard' || isWavingGreet;
  const isPicking = action === 'pick_flower';
  const isCatching = action === 'catch_butterfly';
  const isThinking = expression === 'thinking';
  const isSad = expression === 'sad';
  const isSurprised = expression === 'surprised';
  const isCurious = expression === 'curious';

  const bounce = isRunning
    ? Math.abs(Math.sin(animTime * 8.2)) * -7.5
    : isCatching
      ? Math.abs(Math.sin(animTime * 7.2)) * -10
      : isBowingGreet
        ? 3 + Math.sin(animTime * 3.6) * 2
        : isPicking
          ? 4 + Math.sin(animTime * 4.2) * 3.2
          : isWaving
            ? Math.sin(animTime * 4.4) * -4.0
            : Math.sin(animTime * 2.4) * -2;

  const bodyTilt = isBowingGreet
    ? 13 + Math.sin(animTime * 3.6) * 3
    : isPicking
      ? 12 + Math.sin(animTime * 4.2) * 4.5
      : isCatching
        ? Math.sin(animTime * 3.8) * 6
        : isRunning
          ? 4.5
          : isCurious
            ? 4
            : isSad
              ? -2
              : 0;

  const headTilt = isBowingGreet
    ? 14 + Math.sin(animTime * 3.6) * 2.5
    : isPicking
      ? -4 + Math.sin(animTime * 4.2) * 3
      : isCatching
        ? Math.sin(animTime * 4.8) * 6
        : isCurious
          ? -8
          : isThinking
            ? 6
            : isSad
              ? 5
              : isWaving
                ? Math.sin(animTime * 3.8) * 4.5
                : Math.sin(animTime * 2) * 2;

  const leftLegRot = isRunning
    ? Math.sin(animTime * 8.2) * 22
    : isCatching
      ? Math.sin(animTime * 7.2) * 14
      : isWavingGreet
        ? Math.sin(animTime * 4.4) * 7
        : 0;
  const rightLegRot = isRunning
    ? -Math.sin(animTime * 8.2) * 22
    : isCatching
      ? -Math.sin(animTime * 7.2) * 14
      : isWavingGreet
        ? -Math.sin(animTime * 4.4) * 7
        : 0;

  let leftArmRot = isRunning
    ? -Math.sin(animTime * 8.2) * 24
    : Math.sin(animTime * 2.4) * 4;
  let rightArmRot = isRunning
    ? Math.sin(animTime * 8.2) * 24
    : -Math.sin(animTime * 2.4) * 4;

  if (isBowingGreet) {
    leftArmRot = -20;
    rightArmRot = 20;
  } else if (isWaving) {
    rightArmRot = -136 + Math.sin(animTime * 10.5) * 20;
    leftArmRot = 14;
  } else if (isPicking) {
    rightArmRot = -52 + Math.sin(animTime * 4.8) * 11;
    leftArmRot = 24 + Math.cos(animTime * 4.2) * 4;
  } else if (isCatching) {
    const flapReach = Math.sin(animTime * 9.5) * 20;
    leftArmRot = 114 + flapReach;
    rightArmRot = -114 - flapReach;
  } else if (isThinking) {
    rightArmRot = -108;
    leftArmRot = 10;
  } else if (isSurprised) {
    leftArmRot = 68;
    rightArmRot = -68;
  } else if (isSad) {
    leftArmRot = 14;
    rightArmRot = -14;
  }

  const flipX = facing === 'left' ? -1 : 1;

  // Slightly lighter tint helper for soft pastel hair shine
  const hairStyle = student.hairStyle % 6;

  return (
    <svg
      viewBox="-14 -20 268 334"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={student.name}
    >
      <defs>
        {/* Soft pastel skin shading */}
        <radialGradient id={`skin-${uid}`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#fff2e9" />
          <stop offset="68%" stopColor="#fde0cf" />
          <stop offset="100%" stopColor="#f6c7b2" />
        </radialGradient>

        {/* Rosy airbrushed cheek blush */}
        <radialGradient id={`blush-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f692a6" stopOpacity="0.65" />
          <stop offset="65%" stopColor="#f9b4c2" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f9b4c2" stopOpacity="0" />
        </radialGradient>

        {/* Luminous layered iris gradient */}
        <linearGradient id={`iris-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2f221e" />
          <stop offset="48%" stopColor={student.eyeColor} />
          <stop offset="100%" stopColor="#b98b73" />
        </linearGradient>

        {/* Soft hair sheen gradient */}
        <linearGradient id={`hair-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={student.hairColor} />
          <stop offset="100%" stopColor="#2b2122" />
        </linearGradient>

        {/* Pastel Ca Dong tunic gradient */}
        <linearGradient id={`tunic-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={student.outfitColor} />
          <stop offset="100%" stopColor="#2d374e" />
        </linearGradient>
      </defs>

      {/* Soft ground drop shadow */}
      <ellipse
        cx="120"
        cy="292"
        rx={isRunning ? 40 : 46}
        ry="9"
        fill="rgba(85, 68, 56, 0.17)"
      />

      {/* Full character transform group */}
      <g
        transform={`translate(120, 0) scale(${flipX}, 1) translate(-120, ${bounce}) rotate(${bodyTilt}, 120, 235)`}
      >
        {/* BACKPACK (peeking behind shoulders) */}
        <g>
          <rect
            x="73"
            y="156"
            width="94"
            height="74"
            rx="24"
            fill={student.backpackColor}
            stroke={line}
            strokeWidth="2"
          />
          <rect
            x="78"
            y="160"
            width="84"
            height="24"
            rx="14"
            fill={student.accentColor}
            opacity="0.85"
          />
        </g>

        {/* BACK HAIR LAYER (unique fluffy styles behind head/neck) */}
        <g fill={`url(#hair-${uid})`} stroke={line} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {hairStyle === 0 && (
            /* Fluffy twin soft puffs */
            <>
              <ellipse cx="64" cy="96" rx="22" ry="26" />
              <ellipse cx="176" cy="96" rx="22" ry="26" />
              <circle cx="57" cy="68" r="17" />
              <circle cx="183" cy="68" r="17" />
              <path d="M58 79 Q64 72 72 78" fill="none" stroke={student.accentColor} strokeWidth="5" />
              <path d="M168 78 Q176 72 182 79" fill="none" stroke={student.accentColor} strokeWidth="5" />
            </>
          )}
          {hairStyle === 1 && (
            /* Soft wavy shoulder-length bob */
            <path d="M58 84 C44 114, 46 154, 66 168 C78 175, 92 168, 92 156 L148 156 C148 168, 162 175, 174 168 C194 154, 196 114, 182 84 Z" />
          )}
          {hairStyle === 2 && (
            /* Short fluffy tousled boyish curls */
            <path d="M58 92 C48 76, 54 50, 74 44 C86 30, 154 30, 166 44 C186 50, 192 76, 182 92 Z" />
          )}
          {hairStyle === 3 && (
            /* Cute twin low wavy braids with pastel ribbons */
            <>
              <path d="M62 92 C48 118, 46 146, 56 164 C62 174, 72 170, 74 158 C76 140, 76 114, 74 96 Z" />
              <path d="M178 92 C192 118, 194 146, 184 164 C178 174, 168 170, 166 158 C164 140, 164 114, 166 96 Z" />
              <circle cx="62" cy="156" r="6" fill="#f28b82" />
              <circle cx="178" cy="156" r="6" fill="#f28b82" />
            </>
          )}
          {hairStyle === 4 && (
            /* Soft medium layered locks with cute side waves */
            <path d="M56 90 C46 118, 54 150, 74 160 L166 160 C186 150, 194 118, 184 90 Z" />
          )}
          {hairStyle === 5 && (
            /* Fluffy high top-bun / puff */
            <>
              <circle cx="120" cy="30" r="21" />
              <path d="M104 40 Q120 33 136 40" fill="none" stroke={student.backpackColor} strokeWidth="5" />
              <path d="M60 94 C52 118, 56 144, 72 152 L168 152 C184 144, 188 118, 180 94 Z" />
            </>
          )}
        </g>

        {/* LEGS & ROUNDED SHOES */}
        <g>
          {/* Left Leg */}
          <g transform={`rotate(${leftLegRot}, 103, 232)`}>
            <rect
              x="92"
              y="224"
              width="21"
              height="44"
              rx="10"
              fill="#46526d"
              stroke={line}
              strokeWidth="2"
            />
            <ellipse
              cx="101"
              cy="272"
              rx="16"
              ry="10"
              fill="#7b5848"
              stroke={line}
              strokeWidth="2"
            />
            <ellipse cx="99" cy="269" rx="7" ry="3" fill="#a67c68" opacity="0.55" />
          </g>

          {/* Right Leg */}
          <g transform={`rotate(${rightLegRot}, 137, 232)`}>
            <rect
              x="127"
              y="224"
              width="21"
              height="44"
              rx="10"
              fill="#46526d"
              stroke={line}
              strokeWidth="2"
            />
            <ellipse
              cx="139"
              cy="272"
              rx="16"
              ry="10"
              fill="#7b5848"
              stroke={line}
              strokeWidth="2"
            />
            <ellipse cx="137" cy="269" rx="7" ry="3" fill="#a67c68" opacity="0.55" />
          </g>
        </g>

        {/* LEFT ARM (soft rounded sleeve + brocade cuff + chubby rounded hand) */}
        <g transform={`rotate(${leftArmRot}, 82, 166)`}>
          <path
            d="M84 162 C68 168, 56 188, 60 206 C62 214, 74 214, 78 205 C84 192, 88 178, 90 168 Z"
            fill={`url(#tunic-${uid})`}
            stroke={line}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Pastel Ca Dong sleeve cuff */}
          <path
            d="M59 198 Q69 203 79 198 L77 207 Q68 211 60 206 Z"
            fill="#e57373"
            stroke={line}
            strokeWidth="1.5"
          />
          {/* Rounded Chibi hand */}
          <circle
            cx="67"
            cy="214"
            r="10.5"
            fill={`url(#skin-${uid})`}
            stroke={line}
            strokeWidth="1.9"
          />
        </g>

        {/* TORSO & AUTHENTIC PASTEL CA DONG BROCADE OUTFIT */}
        <g>
          {/* Flared Ca Dong lower skirt/tunic hem */}
          <path
            d="M84 202 L156 202 C164 222, 166 238, 160 244 C140 248, 100 248, 80 244 C74 238, 76 222, 84 202 Z"
            fill={`url(#tunic-${uid})`}
            stroke={line}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Pastel Ca Dong brocade lower bands */}
          <path
            d="M78 229 Q120 233 162 229 L161 239 Q120 243 79 239 Z"
            fill="#e57373"
          />
          <path
            d="M79 224 Q120 228 161 224"
            fill="none"
            stroke="#fde68a"
            strokeWidth="2.5"
          />
          <path
            d="M80 241 Q120 245 160 241"
            fill="none"
            stroke="#fffbeb"
            strokeWidth="2"
          />
          {/* Geometric woven diamonds along hem */}
          {[90, 105, 120, 135, 150].map((dx) => (
            <polygon
              key={dx}
              points={`${dx},230 ${dx + 4},234 ${dx},238 ${dx - 4},234`}
              fill="#fde68a"
            />
          ))}

          {/* Upper Ca Dong Tunic */}
          <path
            d="M88 154 C84 168, 82 192, 84 205 Q120 210 156 205 C158 192, 156 168, 152 154 Z"
            fill={`url(#tunic-${uid})`}
            stroke={line}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Ca Dong pastel chest yoke & vertical front woven placket */}
          <path
            d="M87 166 Q120 172 153 166 L154 176 Q120 182 86 176 Z"
            fill="#e57373"
          />
          <path
            d="M87 164 Q120 170 153 164"
            fill="none"
            stroke="#fde68a"
            strokeWidth="2"
          />
          <rect x="114" y="176" width="12" height="28" rx="4" fill="#e57373" />
          <polygon points="120,181 124,186 120,191 116,186" fill="#fffbeb" />
          <polygon points="120,192 124,197 120,202 116,197" fill="#a7f3d0" />

          {/* Woven pastel waist sash */}
          <path
            d="M83 200 Q120 206 157 200 L156 208 Q120 214 84 208 Z"
            fill="#f28b82"
            stroke={line}
            strokeWidth="1.6"
          />

          {/* Traditional Ca Dong Pastel Beaded Necklace */}
          {[98, 105, 112, 120, 128, 135, 142].map((bx, i) => (
            <circle
              key={bx}
              cx={bx}
              cy={158 + Math.sin((i / 6) * Math.PI) * 7}
              r="3.4"
              fill={i % 2 === 0 ? '#fffbeb' : '#fde68a'}
              stroke={line}
              strokeWidth="1.1"
            />
          ))}

          {/* Pastel Backpack Shoulder Straps */}
          <path
            d="M93 155 Q89 178 93 198"
            fill="none"
            stroke={student.backpackColor}
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M147 155 Q151 178 147 198"
            fill="none"
            stroke={student.backpackColor}
            strokeWidth="6.5"
            strokeLinecap="round"
          />
        </g>

        {/* RIGHT ARM (with flower prop if picking/holding) */}
        <g transform={`rotate(${rightArmRot}, 158, 166)`}>
          <path
            d="M156 162 C172 168, 184 188, 180 206 C178 214, 166 214, 162 205 C156 192, 152 178, 150 168 Z"
            fill={`url(#tunic-${uid})`}
            stroke={line}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M181 198 Q171 203 161 198 L163 207 Q172 211 180 206 Z"
            fill="#e57373"
            stroke={line}
            strokeWidth="1.5"
          />
          {/* Rounded Chibi hand */}
          <circle
            cx="173"
            cy="214"
            r="10.5"
            fill={`url(#skin-${uid})`}
            stroke={line}
            strokeWidth="1.9"
          />

          {/* Held realistic wildflower in hand */}
          {(holdingFlower || isPicking) && (
            <g transform="translate(174, 214) rotate(28)">
              <path
                d="M0 4 Q2 -14 0 -30"
                fill="none"
                stroke="#4d9b56"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M0 -12 Q10 -18 14 -12 Q6 -8 0 -12 Z"
                fill="#76c47f"
                stroke="#3f7d47"
                strokeWidth="1.1"
              />
              {/* 5 soft golden petals */}
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-36"
                  rx="4.6"
                  ry="8.2"
                  fill="#fde047"
                  stroke="#d97706"
                  strokeWidth="1.1"
                  transform={`rotate(${deg}, 0, -30)`}
                />
              ))}
              <circle cx="0" cy="-30" r="4.5" fill="#f59e0b" />
            </g>
          )}
        </g>

        {/* NECK */}
        <rect
          x="111"
          y="142"
          width="18"
          height="18"
          rx="8"
          fill="#f6c7b2"
          stroke={line}
          strokeWidth="1.8"
        />

        {/* BIG ADORABLE CHIBI HEAD (~43% height) */}
        <g transform={`rotate(${headTilt}, 120, 146)`}>
          {/* Cute Rounded Ears */}
          <ellipse
            cx="63"
            cy="104"
            rx="10"
            ry="13"
            fill={`url(#skin-${uid})`}
            stroke={line}
            strokeWidth="1.9"
          />
          <ellipse
            cx="177"
            cy="104"
            rx="10"
            ry="13"
            fill={`url(#skin-${uid})`}
            stroke={line}
            strokeWidth="1.9"
          />

          {/* Plump Soft Chibi Face Contour */}
          <path
            d="M64 96 C62 52, 90 36, 120 36 C150 36, 178 52, 176 96 C174 134, 150 152, 120 152 C90 152, 66 134, 64 96 Z"
            fill={`url(#skin-${uid})`}
            stroke={line}
            strokeWidth="2.1"
            strokeLinejoin="round"
          />

          {/* Rosy Natural Cheek Blush */}
          <ellipse cx="83" cy="116" rx="14" ry="9" fill={`url(#blush-${uid})`} />
          <ellipse cx="157" cy="116" rx="14" ry="9" fill={`url(#blush-${uid})`} />
          <line x1="77" y1="115" x2="81" y2="119" stroke="#f08299" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          <line x1="83" y1="115" x2="87" y2="119" stroke="#f08299" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          <line x1="153" y1="115" x2="157" y2="119" stroke="#f08299" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
          <line x1="159" y1="115" x2="163" y2="119" stroke="#f08299" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />

          {/* LUMINOUS CHIBI EYES */}
          {[93, 147].map((cx, eyeIdx) => {
            const lookShiftX = isThinking ? 3.5 : isCurious ? (eyeIdx === 0 ? 1.5 : 1.5) : 0;
            const lookShiftY = isThinking ? -3 : 0;
            const eyeScaleY = isSurprised ? 1.14 : isSad ? 0.94 : 1;

            return (
              <g
                key={cx}
                transform={`translate(${cx}, 100) scale(1, ${eyeScaleY})`}
              >
                {/* Soft sclera */}
                <ellipse cx="0" cy="0" rx="14" ry="15.5" fill="#ffffff" />
                {/* Upper eyelid soft shadow */}
                <path
                  d="M-13 -4 Q0 -15 13 -4"
                  fill="none"
                  stroke="rgba(91,66,56,0.18)"
                  strokeWidth="3.5"
                />
                {/* Rich glossy iris */}
                <ellipse
                  cx={lookShiftX}
                  cy={1 + lookShiftY}
                  rx={isSurprised ? 9.5 : 11.2}
                  ry={isSurprised ? 11.5 : 13.2}
                  fill={`url(#iris-${uid})`}
                />
                {/* Deep pupil */}
                <circle
                  cx={lookShiftX}
                  cy={1.5 + lookShiftY}
                  r={isSurprised ? 4.4 : 5.4}
                  fill="#231815"
                />
                {/* Lower luminous crescent reflection */}
                <path
                  d="M-6 8 Q0 12 6 8"
                  fill="none"
                  stroke="#fde68a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                {/* Crisp white catchlights for lively anime soul */}
                <circle
                  cx={-4.2 + lookShiftX * 0.4}
                  cy={-4.5 + lookShiftY * 0.4}
                  r="4.1"
                  fill="#ffffff"
                />
                <circle
                  cx={4.5 + lookShiftX * 0.4}
                  cy={4.5 + lookShiftY * 0.4}
                  r="1.9"
                  fill="#ffffff"
                />
                {/* Watery tear highlight when sad */}
                {isSad && (
                  <ellipse
                    cx="-5"
                    cy="9"
                    rx="4"
                    ry="2.4"
                    fill="#bae6fd"
                    opacity="0.9"
                  />
                )}
                {/* Soft curved upper eyelash line */}
                <path
                  d="M-15 -2 C-12 -15, 12 -15, 15 -2"
                  fill="none"
                  stroke={line}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <path
                  d={eyeIdx === 0 ? 'M-15 -2 L-18 -5' : 'M15 -2 L18 -5'}
                  fill="none"
                  stroke={line}
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* EXPRESSIVE EYEBROWS */}
          {isSad ? (
            <>
              <path d="M80 79 Q92 76 102 72" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
              <path d="M160 79 Q148 76 138 72" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
            </>
          ) : isSurprised ? (
            <>
              <path d="M81 71 Q93 64 103 71" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
              <path d="M137 71 Q147 64 159 71" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
            </>
          ) : isCurious ? (
            <>
              <path d="M81 74 Q92 67 103 73" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
              <path d="M137 78 Q148 76 159 78" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M82 77 Q93 73 103 77" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />
              <path d="M137 77 Q147 73 158 77" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* TINY CUTE NOSE */}
          <path
            d="M119 112 Q121 114 119 116"
            fill="none"
            stroke="#c68f78"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* EXPRESSIVE MOUTH */}
          {isSurprised ? (
            <ellipse
              cx="120"
              cy="128"
              rx="6"
              ry="7.5"
              fill="#f28b82"
              stroke={line}
              strokeWidth="1.8"
            />
          ) : isSad ? (
            <path
              d="M112 131 Q120 124 128 131"
              fill="none"
              stroke={line}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : isThinking ? (
            <path
              d="M115 128 Q121 129 125 127"
              fill="none"
              stroke={line}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : isCurious ? (
            /* Playful cat smile :3 */
            <path
              d="M111 126 Q115.5 132 120 126 Q124.5 132 129 126"
              fill="none"
              stroke={line}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            /* Bright happy Chibi smile */
            <path
              d="M110 124 Q120 135 130 124 Z"
              fill="#f48fb1"
              stroke={line}
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
          )}

          {/* Tiny surprised sweat/exclamation drop */}
          {isSurprised && (
            <path
              d="M168 62 C164 70, 164 76, 168 76 C172 76, 172 70, 168 62 Z"
              fill="#bae6fd"
              stroke="#60a5fa"
              strokeWidth="1.4"
            />
          )}

          {/* FLUFFY LAYERED FRONT HAIR WITH SOFT INDIVIDUAL STRANDS */}
          <g fill={`url(#hair-${uid})`} stroke={line} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path
              d={
                hairStyle % 2 === 0
                  ? 'M62 94 C60 48, 88 32, 120 32 C152 32, 180 48, 178 94 C174 82, 168 74, 162 88 C156 72, 146 66, 138 82 C132 66, 122 64, 118 82 C110 64, 96 66, 90 84 C82 70, 70 76, 62 94 Z'
                  : 'M62 94 C60 48, 88 32, 120 32 C152 32, 180 48, 178 94 C172 74, 160 70, 152 86 C144 68, 128 66, 120 84 C112 66, 94 70, 86 86 C78 72, 68 76, 62 94 Z'
              }
            />
            {/* Soft wispy side locks framing cheeks */}
            <path d="M62 88 C58 106, 62 122, 70 126 C67 112, 68 98, 72 88 Z" />
            <path d="M178 88 C182 106, 178 122, 170 126 C173 112, 172 98, 168 88 Z" />
            {/* Cute fluffy top ahoge / sprout strand */}
            <path
              d="M118 33 Q126 16 140 22 Q128 24 123 34 Z"
            />
          </g>

          {/* Soft pastel hair shine arc */}
          <path
            d="M84 54 Q104 44 126 48"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Ca Dong Woven Pastel Headband */}
          <path
            d="M72 64 Q120 48 168 64 L165 73 Q120 58 75 73 Z"
            fill="#e57373"
            stroke={line}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {[92, 106, 120, 134, 148].map((hx, idx) => (
            <polygon
              key={hx}
              points={`${hx},${60 + Math.abs(idx - 2) * 1.5} ${hx + 3.5},${63 + Math.abs(idx - 2) * 1.5} ${hx},${66 + Math.abs(idx - 2) * 1.5} ${hx - 3.5},${63 + Math.abs(idx - 2) * 1.5}`}
              fill="#fde68a"
            />
          ))}
        </g>
      </g>
    </svg>
  );
};
