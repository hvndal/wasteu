
const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

// Revert meet-the-team background
css = css.replace(
    '.meet-the-team { background: radial-gradient(circle at 50% 0%, #ffffff 0%, var(--off-white) 100%); }',
    '.meet-the-team { background-color: var(--off-white); }'
);

// Revert team-card
const glassyTeamCard = `.team-card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    transition: all 1.5s ease-out;
}`;

const solidTeamCard = `.team-card {
    background: var(--white);
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    transition: all 1.5s ease-out;
}`;

css = css.replace(glassyTeamCard, solidTeamCard);

// Revert the department background opacity adjustments
css = css.replace(
    '.team-card[data-department="ops"] { background-color: rgba(34, 139, 34, 0.08) !important; border-top: 4px solid var(--forest-green); }',
    '.team-card[data-department="ops"] { background-color: rgba(34, 139, 34, 0.12) !important; border-top: 4px solid var(--forest-green); }'
);
css = css.replace(
    '.team-card[data-department="cx"] { background-color: rgba(0, 168, 107, 0.08) !important; border-top: 4px solid var(--emerald); }',
    '.team-card[data-department="cx"] { background-color: rgba(0, 168, 107, 0.12) !important; border-top: 4px solid var(--emerald); }'
);
css = css.replace(
    '.team-card[data-department="sales"] { background-color: rgba(212, 175, 55, 0.10) !important; border-top: 4px solid #d4af37; }',
    '.team-card[data-department="sales"] { background-color: rgba(212, 175, 55, 0.15) !important; border-top: 4px solid #d4af37; }'
);
css = css.replace(
    '.team-card[data-department="admin"] { background-color: rgba(28, 32, 30, 0.06) !important; border-top: 4px solid var(--primary-black); }',
    '.team-card[data-department="admin"] { background-color: rgba(28, 32, 30, 0.1) !important; border-top: 4px solid var(--primary-black); }'
);

fs.writeFileSync('assets/css/style.css', css, 'utf8');
console.log('CSS reverted.');

