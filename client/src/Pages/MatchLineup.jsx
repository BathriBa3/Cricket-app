import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ScoreCard from './ScoreCard';

const MatchLineup = ({ isSecondInnings = false }) => {
	const [openingBatterOne, setOpeningBatterOne] = useState('');
	const [openingBatterTwo, setOpeningBatterTwo] = useState('');
	const [bowlingTeam, setBowlingTeam] = useState('');
	const [showScoreCard, setShowScoreCard] = useState(false);
	const { names, players } = useSelector((state) => state.teams);
	const { battingTeam, bowlingTeam: selectedBowlingTeam, overs: matchOvers } = useSelector((state) => state.match);

	const availableBattingPlayers = battingTeam === names.A ? players.A : players.B;
	const availableBowlingPlayers = selectedBowlingTeam === names.A ? players.A : players.B;
	const strikerOptions = availableBattingPlayers.filter((player) => player !== openingBatterTwo);
	const nonStrikerOptions = availableBattingPlayers.filter((player) => player !== openingBatterOne);
	const lineupIsComplete = openingBatterOne && openingBatterTwo && bowlingTeam;

	if (showScoreCard) {
		return (
			<ScoreCard
				isSecondInnings={isSecondInnings}
				matchOvers={matchOvers}
				strikerName={openingBatterOne}
				nonStrikerName={openingBatterTwo}
				bowlerName={bowlingTeam}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
			<div className="mx-auto max-w-2xl">
				<h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Match Lineup</h1>
				<p className="mb-10 text-center text-slate-400">Select the opening batters and bowling team.</p>

				<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
					<div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
						<p className="text-sm text-slate-400">Batting team</p>
						<h2 className="mt-1 text-xl font-bold text-white">{battingTeam}</h2>
					</div>

					<div className="space-y-5">
						<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
							<span>Striker</span>
							<select
								value={openingBatterOne}
								onChange={(event) => {
									const selectedPlayer = event.target.value;
									setOpeningBatterOne(selectedPlayer);
									if (selectedPlayer === openingBatterTwo) setOpeningBatterTwo('');
								}}
								className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
							>
								<option value="">Select Player</option>
								{strikerOptions.map((player) => (
									<option key={player} value={player}>{player}</option>
								))}
							</select>
						</label>

						<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
							<span>Non Striker</span>
							<select
								value={openingBatterTwo}
								onChange={(event) => {
									const selectedPlayer = event.target.value;
									setOpeningBatterTwo(selectedPlayer);
									if (selectedPlayer === openingBatterOne) setOpeningBatterOne('');
								}}
								className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
							>
								<option value="">Select Player</option>
								{nonStrikerOptions.map((player) => (
									<option key={player} value={player}>{player}</option>
								))}
							</select>
						</label>

						<label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
							<span>Bowler</span>
							<select
								value={bowlingTeam}
								onChange={(event) => setBowlingTeam(event.target.value)}
								className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
							>
								<option value="">Select bowler</option>
								{availableBowlingPlayers.map((player) => (
									<option key={player} value={player}>{player}</option>
								))}
							</select>
						</label>
					</div>
					<button
						type="button"
						onClick={() => setShowScoreCard(true)}
						disabled={!lineupIsComplete}
						className="mt-8 w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default MatchLineup;
