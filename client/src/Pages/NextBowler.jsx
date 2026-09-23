import React from 'react';

const NextBowler = ({ bowlers, previousBowler, onSelect }) => {
	const availableBowlers = bowlers.filter((bowler) => bowler !== previousBowler);

	return (
		<section className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
			<h3 className="text-base font-bold text-amber-200">Select next bowler</h3>
			<div className="mt-3 grid gap-2 sm:grid-cols-2">
				{availableBowlers.map((bowler) => (
					<button
						type="button"
						key={bowler}
						onClick={() => onSelect(bowler)}
						className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-white transition hover:border-amber-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
					>
						{bowler}
					</button>
				))}
			</div>
		</section>
	);
};

export default NextBowler;