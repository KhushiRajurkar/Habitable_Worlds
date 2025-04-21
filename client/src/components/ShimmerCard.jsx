function ShimmerCard() {
    return (
      <div style={styles.card}>
        <div style={styles.lineShort} />
        <div style={styles.line} />
        <div style={styles.line} />
        <div style={styles.line} />
        <div style={styles.line} />
      </div>
    );
  }

  const shimmer = {
    background: "linear-gradient(90deg, #2c2c2c 25%, #3c3c3c 37%, #2c2c2c 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  };

  const styles = {
    card: {
      width: "100%",
      maxWidth: "500px",
      minHeight: "260px",
      backgroundColor: "#1a1a1a",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    line: {
      height: "16px",
      borderRadius: "6px",
      marginBottom: "10px",
      ...shimmer,
    },
    lineShort: {
      height: "20px",
      width: "60%",
      borderRadius: "6px",
      marginBottom: "15px",
      ...shimmer,
    },
  };

  export default ShimmerCard;
