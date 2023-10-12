import React, { useEffect, useState } from 'react';

interface Leader {
    walletId: string;
    closedAccounts: number;
}

function Leaderboard() {
    const [leaders, setLeaders] = useState<Leader[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/leaderboard')
            .then(response => response.json())
            .then(data => setLeaders(data));
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaders.map((leader, index) => (
                    <li key={index}>
                        Wallet ID: {leader.walletId}, Closed Accounts: {leader.closedAccounts}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;