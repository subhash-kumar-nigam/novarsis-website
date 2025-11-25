import PropTypes from 'prop-types';

function Button({ text, className, onClick, disabled = false }) {
  return (
    <button className={className} onClick={onClick ? (e) => onClick(e) : undefined} disabled={disabled}>
      {disabled ? 'Loading.....' : text}
    </button>
  );
}

// ✅ PropTypes validation
Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

// ✅ Default props (optional if you want to ensure defaults)
Button.defaultProps = {
  className: '',
  onClick: undefined,
  disabled: false
};

export default Button;
