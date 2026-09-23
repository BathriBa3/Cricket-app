import React, { useState } from 'react';
import axios from 'axios'

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		try{
		event.preventDefault();
		// Add authentication logic here.
		let request = {};
		request.Email = email;
		request.Password = password;
		let response = await axios.get("http://localhost:5000/login");
		console.log(response,"response")
		}
		catch(err){
            console.log(err, "error while login")
		}
	};

	return (
		<main style={styles.page}>
			<form onSubmit={handleSubmit} style={styles.card}>
				<h1 style={styles.title}>Login</h1>

				{/* <label htmlFor="email" style={styles.label}>Email</label> */}
				<input
					id="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Enter your email"
					required
					style={styles.input}
				/>

				{/* <label htmlFor="password" style={styles.label}>Password</label> */}
				<input
					id="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="Enter your password"
					required
					style={styles.input}
				/>

				<button type="submit" style={styles.button}>Login</button>
			</form>
		</main>
	);
};

const styles = {
	page: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black',
		padding: '24px',
	},
	card: {
		width: '100%',
		maxWidth: '400px',
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		padding: '32px',
		borderRadius: '12px',
		backgroundColor: '#fff',
		boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
	},
	title: { margin: '0 0 12px', textAlign: 'center' },
	label: { fontWeight: '600' },
	input: {
		padding: '12px',
		marginBottom: '8px',
		border: '1px solid #ccd3dd',
		borderRadius: '6px',
		fontSize: '16px',
	},
	button: {
		padding: '12px',
		marginTop: '8px',
		border: 'none',
		borderRadius: '6px',
		backgroundColor: '#2563eb',
		color: '#fff',
		fontSize: '16px',
		fontWeight: '600',
		cursor: 'pointer',
	},
};

export default Login;
