function Home() {
  const containerStyle = {
    width: '100%',
    padding: '60px 80px',
    boxSizing: 'border-box',
    backgroundColor: '#0b0c10', // dark background
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const leftStyle = {
    flex: '1',
    minWidth: '300px',
    maxWidth: '600px',
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '42px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#66fcf1'
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '15px'
  };

  const rightStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'center'
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
  };

  return (
    <div style={containerStyle}>
      {/* Left Section */}
      <div style={leftStyle}>
        <h1 style={titleStyle}>Novarsis Technology</h1>
        <p style={paragraphStyle}>
          Novarsis Technology is a leading <strong>software development company based in Indore</strong>, delivering innovative and scalable
          solutions for businesses worldwide. We specialize in
          <strong> Web Development, Mobile Applications, Cloud Solutions,</strong> and custom enterprise software tailored to meet client
          needs.
        </p>
        <p style={paragraphStyle}>
          Our mission is to empower organizations through technology and create digital experiences that inspire growth, innovation, and
          success.
        </p>
      </div>

      {/* Right Section */}
      <div style={rightStyle}>
        <img src="/Novarsis-Logo-1-scaled.47b3e3bc739320c1b4da.webp" alt="Novarsis Technology Office" style={imageStyle} />
      </div>
    </div>
  );
}

export default Home;
