import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'

const InningsResult = () => {
	const score = useSelector((state) => state.secondInnings.totalScore);
	const targetScore = useSelector((state) => state.secondInnings.targetScore);
	const { battingTeam, bowlingTeam } = useSelector((state) => state.match);
	const battingTeamWon = score >= targetScore;
	const winner = battingTeamWon ? battingTeam : bowlingTeam;
    let redux = useSelector((state) => state);
    const handlEndInnings = async() =>{
       
       console.log(redux,"redux")
       let request = {...redux,"winner": winner}
       let response = await axios.post("http://localhost:5000/endInnings",request)
        
        
    }
	return (
		<section className="match-result rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center sm:p-8">
			<p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Match result</p>
			<h2 className="match-result-winner mt-3 text-3xl font-black text-white">{winner} won</h2>
			<p className="mt-3 text-slate-300">
				{battingTeamWon ? `${battingTeam} chased the target.` : `${bowlingTeam} defended the target.`}
			</p>
            <button
								type="button"
								onClick={handlEndInnings}
								disabled={false}
								className="min-h-16 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-3 text-base font-bold text-rose-300 transition hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
			>
								End Innings
							</button>
		</section>
	);
};

export default InningsResult;