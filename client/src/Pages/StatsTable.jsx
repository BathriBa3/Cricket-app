import React from 'react';

const battingHeaders = ['Name', 'R', 'B', '4s', '6s', 'Strike Rate'];
const bowlingHeaders = ['Name', 'Over','R' , 'M', 'W', 'Economy'];

const StatsTable = ({ type, rows }) => {
	const headers = type === 'batting' ? battingHeaders : bowlingHeaders;

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[480px] text-left text-sm">
				<thead>
					<tr className="text-xs uppercase tracking-wider text-slate-400">
						{headers.map((header) => (
							<th key={header} className="px-3 py-2 font-semibold first:pl-0 last:pr-0">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.name} className="text-slate-200">
							{row.values.map((value, index) => (
								<td key={`${row.name}-${headers[index]}`} className="px-3 py-3 font-medium first:pl-0 last:pr-0">
									{value}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StatsTable;