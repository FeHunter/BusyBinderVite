export function Loading() {
    return (
        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            width: '50%',
            fontSize: '2em',
            opacity: '.5'
        }}>
            <i className="fa-solid fa-spinner" style={{
                animation: 'spin 1.5s linear infinite',
                display: 'inline-block'
            }}></i>
        </span>
    );
}

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`, styleSheet.cssRules.length);
