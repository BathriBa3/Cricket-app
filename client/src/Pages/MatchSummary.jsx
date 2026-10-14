import React from 'react'
import { useSelector } from 'react-redux';

const MatchSummaryTable = (props) => {
    // console.log(battingPlayers,"battingPlayers")
    const battingHeaders = ['Name', 'R', 'B', '4s', '6s', 'Strike Rate'];
    const bowlingHeaders = ['Name', 'Over', 'R', 'M', 'W', 'Economy'];
    const getStrikeRate = (runs, balls) =>
        balls > 0 ? ((runs / balls) * 100).toFixed(2) : '0.00'

    const getEconomy = (runs,balls) => balls
		? ((runs / balls) * 6).toFixed(2)
		: '0.00';

    const getOvers = (balls) => `${Math.floor(balls / 6)}.${balls % 6}`;
    return (
        <>
            <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-400">
                        {battingHeaders.map((header) => (
                            <th key={header} className="px-3 py-2 font-semibold first:pl-0 last:pr-0">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.battingPlayers.map(([name, stats]) => (
                        <tr key={name} className="border-t border-slate-800 text-slate-200">
                            <td className="px-3 py-3 font-medium first:pl-0">{name}</td>
                            <td className="px-3 py-3">{stats.runs}</td>
                            <td className="px-3 py-3">{stats.balls}</td>
                            <td className="px-3 py-3">{stats.fours}</td>
                            <td className="px-3 py-3">{stats.sixes}</td>
                            <td className="px-3 py-3 last:pr-0">
                                {getStrikeRate(stats.runs, stats.balls)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-400">
                        {bowlingHeaders.map((header) => (
                            <th key={header} className="px-3 py-2 font-semibold first:pl-0 last:pr-0">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.bowlingPlayers.map(([name, stats]) => (
                        <tr key={name} className="border-t border-slate-800 text-slate-200">
                            <td className="px-3 py-3 font-medium first:pl-0">{name}</td>
                            <td className="px-3 py-3">{getOvers(stats.balls)}</td>
                            <td className="px-3 py-3">{stats.runs}</td>
                            <td className="px-3 py-3">{stats.maidens}</td>
                            <td className="px-3 py-3">{stats.wickets}</td>
                            <td className="px-3 py-3 last:pr-0">{getEconomy(stats.runs, stats.balls)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const MatchSummary = () => {


      let redux = useSelector((state) => state);
    // const redux = {
    //     firstInnings: {
    //         battingPlayers: {
    //             Bathri: { runs: 24, balls: 6, fours: 6, sixes: 0 },
    //             Pandi: { runs: 0, balls: 0, fours: 0, sixes: 0 },
    //         },
    //         bowlingPlayers: {
    //             Hari: { balls: 6, runs: 24, maidens: 0, wickets: 0, overRuns: 0 },
    //         },
    //     },
    // }




    const firstInningsBattingPlayers = Object.entries(redux.firstInnings?.battingPlayers ?? {})
    const firstInningsBowlingPlayers = Object.entries(redux.firstInnings?.bowlingPlayers ?? {})
    const secondInningsBattingPlayers = Object.entries(redux.secondInnings?.battingPlayers ?? {})
    const secondInningsBowlingPlayers = Object.entries(redux.secondInnings?.bowlingPlayers ?? {})

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
            <p className="mb-6 text-xl font-semibold">Match Summary</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
                    <div className="overflow-x-auto">
                        <MatchSummaryTable battingPlayers={firstInningsBattingPlayers} bowlingPlayers={firstInningsBowlingPlayers}></MatchSummaryTable>
                    </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
                    <div className="overflow-x-auto">
                        <MatchSummaryTable battingPlayers={secondInningsBattingPlayers} bowlingPlayers={secondInningsBowlingPlayers}></MatchSummaryTable>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchSummary