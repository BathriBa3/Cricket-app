import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MatchLineup from './MatchLineup';
import { setMatchLineup } from '../store/matchSlice';

const MatchSettings = () => {
	const [overs, setOvers] = useState('');
	const [powerPlay, setPowerPlay] = useState('');
	const [tossWinner, setTossWinner] = useState('');
	const [electedTo, setElectedTo] = useState('');
	const [showLineup, setShowLineup] = useState(false);
	const dispatch = useDispatch();
	const { names: teamNames } = useSelector((state) => state.teams);
	const teamA = teamNames.A;
	const teamB = teamNames.B;

	if (showLineup) {
		return <MatchLineup />;
	}

	const settingsAreComplete = overs && powerPlay && tossWinner && electedTo;

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
			<div className="mx-auto max-w-2xl">
				<h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Match Settings</h1>
				<p className="mb-10 text-center text-slate-400">Set the rules before the match begins.</p>

				<div className="mb-8 grid gap-4 sm:grid-cols-2">
					<div className="rounded-xl border border-blue-400/30 bg-blue-400/10 p-5 text-center">
						<span className="text-sm text-slate-400">Team A</span>
						<h2 className="mt-1 text-xl font-bold text-white">{teamA}</h2>
					</div>
					<div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-center">
						<span className="text-sm text-slate-400">Team B</span>
						<h2 className="mt-1 text-xl font-bold text-white">{teamB}</h2>
					</div>
				</div>

				<form
					onSubmit={(event) => {
						event.preventDefault();
						if (settingsAreComplete) {
							const battingTeam = electedTo === 'Batting'
								? tossWinner
								: tossWinner === teamA ? teamB : teamA;
							const bowlingTeam = battingTeam === teamA ? teamB : teamA;
							dispatch(setMatchLineup({ battingTeam, bowlingTeam, overs }));
							setShowLineup(true);
						}
					}}
					className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
				>
					<div className="grid gap-5 sm:grid-cols-2">
						<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
							<span>No. of Overs</span>
							<input
								type="number"
								min="1"
								value={overs}
								onChange={(event) => setOvers(event.target.value)}
								placeholder="e.g. 20"
								className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
							/>
						</label>
						<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
							<span>Power Play Overs</span>
							<input
								type="number"
								min="0"
								value={powerPlay}
								onChange={(event) => setPowerPlay(event.target.value)}
								placeholder="e.g. 6"
								className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
							/>
						</label>
					</div>

					<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
						<span>Who won the toss?</span>
						<select
							value={tossWinner}
							onChange={(event) => setTossWinner(event.target.value)}
							className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
						>
							<option value="">Select a team</option>
							<option value={teamA}>{teamA}</option>
							<option value={teamB}>{teamB}</option>
						</select>
					</label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
						<span>Elected to?</span>
						<select
							value={electedTo}
							onChange={(event) => setElectedTo(event.target.value)}
							className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
						>
							<option value="">Select a type</option>
							<option value="Batting">Batting</option>
							<option value="Bowling">Bowling</option>
						</select>
					</label>
					<button
						type="submit"
						disabled={!settingsAreComplete}
						className="w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
					>
						Let's go
					</button>
				</form>
			</div>
		</div>
	);
};

export default MatchSettings;
