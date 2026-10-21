export function HUD() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ff88dd',
        fontSize: 28,
        fontWeight: 'bold',
        textShadow: '0 0 20px #ff44aa, 2px 2px 0 #000',
        letterSpacing: 4,
        textTransform: 'uppercase',
      }}>
        GTA Vice City Demo
      </div>
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
        lineHeight: '1.7',
        textShadow: '1px 1px 3px #000',
        background: 'rgba(0,0,0,0.4)',
        padding: '10px 16px',
        borderRadius: 8,
        borderLeft: '3px solid #ff44aa',
      }}>
        <div style={{ color: '#ff88dd', fontWeight: 'bold', marginBottom: 4 }}>CONTROLS</div>
        <div>Click canvas to lock mouse</div>
        <div>WASD — Move</div>
        <div>Shift — Sprint</div>
        <div>Space — Jump</div>
        <div>Mouse — Camera</div>
        <div>Esc — Release mouse</div>
      </div>
      <div style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        color: 'rgba(255,136,100,0.8)',
        fontSize: 11,
        textAlign: 'right',
        textShadow: '1px 1px 3px #000',
      }}>
        <div style={{ fontSize: 16, color: '#ff88dd' }}>VICE CITY</div>
        <div>1986</div>
      </div>
    </div>
  )
}
