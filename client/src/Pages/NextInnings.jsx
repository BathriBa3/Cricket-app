import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTargetScore } from '../store/secondInningsSlice';

const NextInnings = ({ onStart }) => {
	const dispatch = useDispatch();
	const totalScore = useSelector((state) => state.firstInnings.totalScore);
	const { battingTeam, bowlingTeam, overs } = useSelector((state) => state.match);
	const targetScore = totalScore + 1;

	return (
		<section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center sm:p-8">
			<p className="text-lg font-semibold text-emerald-200">
				{bowlingTeam} needs {targetScore} runs to win against {battingTeam} in {overs} overs
			</p>
			<button
				type="button"
				onClick={() => {
					dispatch(setTargetScore(targetScore));
					onStart();
				}}
				className="mt-6 w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
			>
				Start Next Innings
			</button>
		</section>
	);
};

export default NextInnings;