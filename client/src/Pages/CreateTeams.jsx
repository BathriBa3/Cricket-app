import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePlayers from './CreatePlayers';
import { setTeamName } from '../store/teamsSlice';

const TeamSetup = ({ team }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const name = useSelector((state) => state.teams.names[team]);
	const saveTeamName = (event) => {
		event.preventDefault();
		if (!name.trim()) return;
		setIsOpen(false);
	};

	return (
		<div className="flex w-full flex-col items-center gap-3">
			<div
				role="img"
				aria-label={`Team ${team} logo`}
				className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-2xl font-bold text-white"
			>
				{team}
			</div>
			<button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				{isOpen ? `Close Team ${team}` : `Edit Team ${team}`}
			</button>

			{isOpen && (
				<form onSubmit={saveTeamName} className="flex w-full max-w-xs flex-col gap-2">
					<label htmlFor={`team-${team}`} className="text-left text-sm font-medium text-slate-300">
						Team {team} name
					</label>
					<div className="flex gap-2">
						<input
							id={`team-${team}`}
							type="text"
							value={name}
							onChange={(event) => dispatch(setTeamName({ team, name: event.target.value }))}
							placeholder={`Enter Team ${team} name`}
							className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
						/>
						<button
							type="submit"
							className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							Save
						</button>
					</div>
				</form>
			)}

			{name && <p className="text-lg font-bold text-white">{name}</p>}
		</div>
	);
};

const CreateTeams = () => {
	const [matchStarted, setMatchStarted] = useState(false);
	const teamNames = useSelector((state) => state.teams.names);

	if (matchStarted) {
		return <CreatePlayers />;
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Create Teams</h1>
				<p className="mb-10 text-center text-slate-400">Select a team and add its name.</p>
				<div className="grid gap-8 sm:grid-cols-2">
					<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
						<TeamSetup team="A" />
					</div>
					<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
						<TeamSetup team="B" />
					</div>
				</div>
				<button
					type="button"
					onClick={() => setMatchStarted(true)}
					disabled={!teamNames.A || !teamNames.B}
					className="mt-8 w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
				>
					Start the match!
				</button>
			</div>
		</div>
	);
};

export default CreateTeams;
