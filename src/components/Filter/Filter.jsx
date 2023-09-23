// import css from './Filter.module.css';

const Filter = props => {
  const { onFilterChange } = props;
  return (
    <input
      onChange={e => onFilterChange(e)}
      type="text"
      value={props.filterInput}
    />
  );
};

export default Filter;
