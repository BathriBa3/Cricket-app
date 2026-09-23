import React from 'react';

const dismissalTypes = [
	'Bowled',
	'Catch',
	'Stumping',
	'Run out',
	'Hit wicket',
	'Bowled & catch',
];

const OutModal = ({ onClose, onSelectDismissal }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="presentation">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="dismissal-title"
				className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
			>
				<div className="mb-6 flex items-center justify-between gap-4">
					<h2 id="dismissal-title" className="m-0 text-2xl font-bold text-white">How was the batter out?</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close dismissal popup"
						className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					{dismissalTypes.map((dismissal) => (
						<button
							type="button"
							key={dismissal}
							onClick={() => onSelectDismissal(dismissal)}
							className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-white transition hover:border-emerald-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
						>
							{dismissal}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default OutModal;
