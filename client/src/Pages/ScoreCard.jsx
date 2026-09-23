import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExtraRunsModal from './ExtraRunsModal';
import InningsResult from './InningsResult';
import MatchLineup from './MatchLineup';
import NextBatter from './NextBatter';
import NextBowler from './NextBowler';
import NextInnings from './NextInnings';
import OutModal from './OutModal';
import StatsTable from './StatsTable';
import { updateFirstInnings } from '../store/firstInningsSlice';
import { setMatchLineup } from '../store/matchSlice';
import { updateSecondInnings } from '../store/secondInningsSlice';

const scoringButtons = [
	{ label: '0', runs: 0 },
	{ label: '1', runs: 1 },
	{ label: '2', runs: 2 },
	{ label: '3', runs: 3 },
	{ label: '4', runs: 4 },
	{ label: '6', runs: 6 },
	{ label: 'Wide', runs: 1, legalBall: false },
	{ label: 'No Ball', runs: 1, legalBall: false },
	{ label: 'Bye', runs: 1 },
	{ label: 'OUT', runs: 0 }
];

const emptyBattingStats = { runs: 0, balls: 0, fours: 0, sixes: 0 };
const emptyBowlingStats = { balls: 0, runs: 0, maidens: 0, wickets: 0, overRuns: 0 };

export default function ScoreCard({ matchOvers, strikerName, nonStrikerName, bowlerName, isSecondInnings = false }) {
	const dispatch = useDispatch();
	const [showSecondInnings, setShowSecondInnings] = useState(false);
	const [score, setScore] = useState(0);
	const [balls, setBalls] = useState(0);
	const [wickets, setWickets] = useState(0);
	const [currentStriker, setCurrentStriker] = useState(strikerName);
	const [currentNonStriker, setCurrentNonStriker] = useState(nonStrikerName);
	const [currentBowler, setCurrentBowler] = useState(bowlerName);
	const battingTeamName = useSelector((state) => state.match.battingTeam);
	const battingTeamPlayers = useSelector((state) => {
		const { names, players } = state.teams;
		return battingTeamName === names.A ? players.A : players.B;
	});
	const [availableBatters, setAvailableBatters] = useState(() =>
		battingTeamPlayers.filter((player) => player !== strikerName && player !== nonStrikerName),
	);
	const [battingStats, setBattingStats] = useState({
		[strikerName]: { ...emptyBattingStats },
		[nonStrikerName]: { ...emptyBattingStats },
	});
	const [bowlingStats, setBowlingStats] = useState({
		[bowlerName]: { ...emptyBowlingStats },
	});
	const [history, setHistory] = useState([]);
	const [showOutModal, setShowOutModal] = useState(false);
	const [extraType, setExtraType] = useState('');
	const [showNextBowler, setShowNextBowler] = useState(false);
	const [showNextBatter, setShowNextBatter] = useState(false);
	const { names, players } = useSelector((state) => state.teams);
	const { bowlingTeam } = useSelector((state) => state.match);
	const secondInningsTarget = useSelector((state) => state.secondInnings.targetScore);
	const bowlingPlayers = bowlingTeam === names.A ? players.A : players.B;
	const maximumBalls = Number(matchOvers || 0) * 6;
	const secondInningsWon = isSecondInnings && score >= secondInningsTarget;
	const secondInningsLost = isSecondInnings
		&& !secondInningsWon
		&& ((maximumBalls > 0 && balls >= maximumBalls) || wickets >= 10);
	const inningsIsComplete = isSecondInnings
		? secondInningsWon || secondInningsLost
		: (maximumBalls > 0 && balls >= maximumBalls) || wickets >= 10;
	const remainingBalls = Math.max(maximumBalls - balls, 0);
	const runsRemaining = Math.max(secondInningsTarget - score, 0);

	useEffect(() => {
		const inningsSnapshot = {
			battingPlayers: battingStats,
			bowlingPlayers: bowlingStats,
			totalScore: score,
			wickets,
			legalBalls: balls,
			currentStriker,
			currentNonStriker,
			currentBowler,
		};

		if (isSecondInnings) dispatch(updateSecondInnings(inningsSnapshot));
		else dispatch(updateFirstInnings(inningsSnapshot));
	}, [
		balls,
		battingStats,
		bowlingStats,
		currentBowler,
		currentNonStriker,
		currentStriker,
		dispatch,
		score,
		wickets,
	]);

	if (showSecondInnings) {
		return <MatchLineup isSecondInnings />;
	}
	const addScore = (runs, legalBall = true, rotateOnRun = true, concededRuns = runs) => {
		if (legalBall && inningsIsComplete) return;

		setHistory((previous) => [...previous, {
			score,
			balls,
			wickets,
			currentStriker,
			currentNonStriker,
			currentBowler,
			battingStats,
			bowlingStats,
			availableBatters,
			showNextBatter,
		}]);
		setScore((previous) => previous + runs);
		const nextBalls = legalBall ? balls + 1 : balls;
		if (legalBall) setBalls(nextBalls);
		if (legalBall) {
			setBattingStats((previous) => ({
				...previous,
				[currentStriker]: {
					...previous[currentStriker],
					runs: previous[currentStriker].runs + runs,
					balls: previous[currentStriker].balls + 1,
					fours: previous[currentStriker].fours + (runs === 4 ? 1 : 0),
					sixes: previous[currentStriker].sixes + (runs === 6 ? 1 : 0),
				},
			}));
		}
		const nextBowlerBalls = bowlingStats[currentBowler].balls + (legalBall ? 1 : 0);
		const nextOverRuns = bowlingStats[currentBowler].overRuns + concededRuns;
		const overChangesEnds = legalBall && nextBalls % 6 === 0;
		setBowlingStats((previous) => ({
			...previous,
			[currentBowler]: {
				...previous[currentBowler],
				balls: nextBowlerBalls,
				runs: previous[currentBowler].runs + concededRuns,
				maidens: previous[currentBowler].maidens + (overChangesEnds && nextOverRuns === 0 ? 1 : 0),
				overRuns: overChangesEnds ? 0 : nextOverRuns,
			},
		}));

		const runChangesEnds = rotateOnRun && runs % 2 === 1;
		if (runChangesEnds !== overChangesEnds) {
			setCurrentStriker(currentNonStriker);
			setCurrentNonStriker(currentStriker);
		}
		if (overChangesEnds) setShowNextBowler(true);
		if (overChangesEnds) setShowNextBatter(false);
	};

	const handleDismissal = () => {
		if (inningsIsComplete) return;
		setHistory((previous) => [...previous, {
			score,
			balls,
			wickets,
			currentStriker,
			currentNonStriker,
			currentBowler,
			battingStats,
			bowlingStats,
			availableBatters,
			showNextBatter,
		}]);
		setWickets((previous) => previous + 1);
		setBalls((previous) => previous + 1);
		setBattingStats((previous) => ({
			...previous,
			[currentStriker]: {
				...previous[currentStriker],
				balls: previous[currentStriker].balls + 1,
			},
		}));
		const nextBowlerBalls = bowlingStats[currentBowler].balls + 1;
		const overChangesEnds = (balls + 1) % 6 === 0;
		setBowlingStats((previous) => ({
			...previous,
			[currentBowler]: {
				...previous[currentBowler],
				balls: nextBowlerBalls,
				wickets: previous[currentBowler].wickets + 1,
				maidens: previous[currentBowler].maidens + (overChangesEnds && previous[currentBowler].overRuns === 0 ? 1 : 0),
				overRuns: overChangesEnds ? 0 : previous[currentBowler].overRuns,
			},
		}));
		if (overChangesEnds) {
			setCurrentStriker(currentNonStriker);
			setCurrentNonStriker(currentStriker);
			setShowNextBowler(true);
		}
		setShowNextBatter(availableBatters.length > 0);
		setShowOutModal(false);
	};

	const undo = () => {
		const previous = history[history.length - 1];
		if (!previous) return;
		setScore(previous.score);
		setBalls(previous.balls);
		setWickets(previous.wickets);
		setCurrentStriker(previous.currentStriker);
		setCurrentNonStriker(previous.currentNonStriker);
		setBattingStats(previous.battingStats);
		setCurrentBowler(previous.currentBowler);
		setBowlingStats(previous.bowlingStats);
		setAvailableBatters(previous.availableBatters);
		setShowNextBatter(previous.showNextBatter);
		setShowNextBowler(false);
		setHistory((items) => items.slice(0, -1));
	};

	const overs = `${Math.floor(balls / 6)}.${balls % 6}`;
	const overIsComplete = balls > 0 && balls % 6 === 0;
	const nextBowlerSelectionIsRequired = showNextBowler && overIsComplete && !inningsIsComplete;
	const nextBatterSelectionIsRequired = showNextBatter && !inningsIsComplete;
	const currentBowlerStats = bowlingStats[currentBowler];
	const currentBowlerOvers = `${Math.floor(currentBowlerStats.balls / 6)}.${currentBowlerStats.balls % 6}`;
	const currentBowlerEconomy = currentBowlerStats.balls
		? ((currentBowlerStats.runs / currentBowlerStats.balls) * 6).toFixed(2)
		: '0.00';
	const activeStrikerStats = battingStats[currentStriker];
	const nonStrikerStats = battingStats[currentNonStriker];
	const strikerStrikeRate = activeStrikerStats.balls
		? ((activeStrikerStats.runs / activeStrikerStats.balls) * 100).toFixed(2)
		: '0.00';
	const nonStrikerStrikeRate = nonStrikerStats.balls
		? ((nonStrikerStats.runs / nonStrikerStats.balls) * 100).toFixed(2)
		: '0.00';
	const showExtraRunsModal = Boolean(extraType);
	const handleExtraRuns = (extraRuns) => {
		if (extraType === 'Bye') addScore(extraRuns, true, true, 0);
		else addScore(1 + extraRuns, false, false, 1 + extraRuns);
		setExtraType('');
	};

	return (
		<section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8 lg:px-12">
			<div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.4fr)]">
				<aside className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 sm:p-8">
					<p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Match total</p>
					<div className="space-y-8">
						<div>
							<span className="text-sm font-medium text-slate-300">Total Score</span>
							<strong className="mt-1 block text-7xl font-black tracking-tight text-white">{score}/{wickets}</strong>
						</div>
						<div className="border-t border-emerald-300/20 pt-6">
							<span className="text-sm font-medium text-slate-300">Overs</span>
							<strong className="mt-1 block text-5xl font-black tracking-tight text-emerald-300">{overs}</strong>
							{matchOvers && <span className="mt-2 block text-sm text-slate-400">of {matchOvers} overs</span>}
							{inningsIsComplete && <span className="mt-2 block text-sm font-semibold text-rose-300">Innings complete</span>}
						</div>
						{isSecondInnings && (
							<div className="border-t border-emerald-300/20 pt-6">
								<span className="text-sm font-medium text-slate-300">Target</span>
								<strong className="mt-1 block text-4xl font-black tracking-tight text-white">{secondInningsTarget}</strong>
								<span className="mt-2 block text-sm text-slate-400">{runsRemaining} runs needed</span>
								<span className="mt-1 block text-sm text-slate-400">{remainingBalls} legal balls left</span>
							</div>
						)}
					</div>
				</aside>

				<div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-8">
					<div className="mb-8">
						<p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">Live innings</p>
						<h2 className="m-0 text-3xl font-bold tracking-tight text-white sm:text-4xl">Score Board</h2>
					</div>

					{secondInningsWon || secondInningsLost ? (
						<InningsResult />
					) : inningsIsComplete ? (
								<NextInnings
									onStart={() => {
										dispatch(setMatchLineup({
											battingTeam: bowlingTeam,
											bowlingTeam: battingTeamName,
											overs: matchOvers,
										}));
										setShowSecondInnings(true);
									}}
								/>
					) : nextBowlerSelectionIsRequired ? (
						<NextBowler
							bowlers={bowlingPlayers}
							previousBowler={currentBowler}
							onSelect={(nextBowler) => {
								setCurrentBowler(nextBowler);
								setBowlingStats((previous) => ({
									...previous,
									[nextBowler]: previous[nextBowler] || { ...emptyBowlingStats },
								}));
								setShowNextBowler(false);
							}}
						/>
					) : nextBatterSelectionIsRequired ? (
						<NextBatter
							batters={availableBatters}
							onSelect={(nextBatter) => {
								setCurrentStriker(nextBatter);
								setAvailableBatters((previous) => previous.filter((batter) => batter !== nextBatter));
								setBattingStats((previous) => ({
									...previous,
									[nextBatter]: { ...emptyBattingStats },
								}));
								setShowNextBatter(false);
							}}
						/>
					) : (
						<div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
							{scoringButtons.map(({ label, runs, legalBall = true }) => (
								<button
									type="button"
									key={label}
									onClick={() => {
										if (label === 'OUT') setShowOutModal(true);
										else if (label === 'Wide' || label === 'No Ball' || label === 'Bye') setExtraType(label);
										else addScore(runs, legalBall, legalBall, runs);
									}}
									disabled={inningsIsComplete}
									className="min-h-16 rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:translate-y-0"
								>
									{label}
								</button>
							))}
							<button
								type="button"
								onClick={undo}
								disabled={!history.length}
								className="min-h-16 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-3 text-base font-bold text-rose-300 transition hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
							>
								Undo
							</button>
						</div>
					)}
                    {!inningsIsComplete ? 
					<div className="mt-8 space-y-3">
						<StatsTable
							type="batting"
							rows={[
								{ name: currentStriker, values: [currentStriker, activeStrikerStats.runs, activeStrikerStats.balls, activeStrikerStats.fours, activeStrikerStats.sixes, strikerStrikeRate] },
								{ name: currentNonStriker, values: [currentNonStriker, nonStrikerStats.runs, nonStrikerStats.balls, nonStrikerStats.fours, nonStrikerStats.sixes, nonStrikerStrikeRate] },
							]}
						/>
						<StatsTable
							type="bowling"
							rows={[{ name: currentBowler, values: [currentBowler, currentBowlerOvers, currentBowlerStats.runs, currentBowlerStats.maidens, currentBowlerStats.wickets, currentBowlerEconomy] }]}
						/>
					</div> : <></>
					}
				</div>
			</div>
			{showOutModal && (
				<OutModal
					onClose={() => setShowOutModal(false)}
					onSelectDismissal={handleDismissal}
				/>
			)}
			{showExtraRunsModal && (
				<ExtraRunsModal
					type={extraType}
					onClose={() => setExtraType('')}
					onSelect={handleExtraRuns}
				/>
			)}
		</section>
	);
}
