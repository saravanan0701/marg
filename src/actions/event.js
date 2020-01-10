

const toggleNext = () => ({
  type: 'TOGGLE_NEXT_EVENT'
});

const togglePast = () => ({
  type: 'TOGGLE_PAST_EVENT'
});

const onNext = () =>({
  type : 'NEXT_VIEW_MORE'
});

const onPast = () =>({
  type : 'PAST_VIEW_MORE'
});

export default {
  toggleNext,
  togglePast,
  onNext,
  onPast
}
