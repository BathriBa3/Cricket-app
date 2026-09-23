import React from 'react';

const NextBatter = ({ batters, onSelect }) => {
	return (
		<section className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4">
			<h3 className="text-base font-bold text-rose-200">Select next batter</h3>
			<div className="mt-3 grid gap-2 sm:grid-cols-2">
				{batters.map((batter) => (
					<button
						type="button"
						key={batter}
						onClick={() => onSelect(batter)}
						className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-white transition hover:border-rose-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
					>
						{batter}
					</button>
				))}
			</div>
		</section>
	);
};

export default NextBatter;