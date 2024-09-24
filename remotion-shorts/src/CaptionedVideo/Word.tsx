import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {makeTransform, scale, translateY} from '@remotion/animation-utils';

export const Word: React.FC<{
	enterProgress: number;
	text: string;
	stroke: boolean;
}> = ({enterProgress, text, stroke}) => {

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				top: undefined,
				bottom: 350,
				height: 150,
			}}
		>
			<div
				style={{
					fontSize: 100,
					color: 'white',
					WebkitTextStroke: stroke ? '20px black' : undefined,
					transform: makeTransform([
						scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
						translateY(interpolate(enterProgress, [0, 1], [50, 0])),
					]),
					fontWeight: 700,
					fontFamily: "Rubik",
					textTransform: 'uppercase',
				}}
			>
				{text}
			</div>
		</AbsoluteFill>
	);
};
