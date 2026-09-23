import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MatchSettings from './MatchSettings';
import { addPlayer as addPlayerToTeam } from '../store/teamsSlice';

const TeamPlayers = ({ team }) => {
	const [playerName, setPlayerName] = useState('');
	const dispatch = useDispatch();
	const teamName = useSelector((state) => state.teams.names[team]);
	const players = useSelector((state) => state.teams.players[team]);

	const addPlayer = (event) => {
		event.preventDefault();
		const trimmedName = playerName.trim();
		if (!trimmedName || players.length === 11) return;

		dispatch(addPlayerToTeam({ team, player: trimmedName }));
		setPlayerName('');
	};

	const teamIsFull = players.length === 11;

	return (
		<section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/10">
			<div className="mb-5 flex items-center justify-between gap-4">
				<h2 className="text-xl font-bold text-white">{teamName}</h2>
				<span className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-300">
					{players.length}/11 players
				</span>
			</div>

			<form onSubmit={addPlayer} className="flex gap-2">
				<input
					type="text"
					value={playerName}
					onChange={(event) => setPlayerName(event.target.value)}
					disabled={teamIsFull}
					placeholder={teamIsFull ? 'Team is full' : 'Enter player name'}
					className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<button
					type="submit"
					disabled={teamIsFull}
					className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
				>
					Add
				</button>
			</form>

			{players.length > 0 && (
				<ol className="mt-5 space-y-2">
					{players.map((player, index) => (
						<li key={`${player}-${index}`} className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
							<span className="w-5 text-slate-500">{index + 1}.</span>
							<span>{player}</span>
						</li>
					))}
				</ol>
			)}
		</section>
	);
};

const CreatePlayers = () => {
	const [showSettings, setShowSettings] = useState(false);
	const teamPlayers = useSelector((state) => state.teams.players);

	if (showSettings) {
		return (
			<MatchSettings />
		);
	}

	const bothTeamsAreFull = teamPlayers.A.length === 11 && teamPlayers.B.length === 11;

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
			<div className="mx-auto max-w-5xl">
				<h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Create Playing XI</h1>
				<p className="mb-10 text-center text-slate-400">Add up to 11 players for each team.</p>
				<div className="grid gap-8 lg:grid-cols-2">
					<TeamPlayers
						team="A"
					/>
					<TeamPlayers
						team="B"
					/>
				</div>
				{bothTeamsAreFull && (
					<button
						type="button"
						onClick={() => setShowSettings(true)}
						className="mt-8 w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
					>
						Match settings
					</button>
				)}
			</div>
		</div>
	);
};

export default CreatePlayers;
