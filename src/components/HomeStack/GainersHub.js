
export default GainersHub = {
  gainers: null,
  start: true,
  upArrow: "&#x25B2;",
  downArrow: "",
  currentMarket: "",
  gainersRemovalList: [],
  parseGainers: function (t) {

    let sortedList;
    sortedList = GainersHub.sortList(t, "gainer");
    return sortedList;


  },
  sortList: function (unsortedList, type) { // t and ganiners
    var sortedList = [];
    GainersHub.gainersRemovalList = [];

    unsortedList.forEach(element => {
      sortedList = GainersHub.placeInList(element, sortedList, type);
    });

    return sortedList;
  },
  placeInList: function (unsortedItem, sortedList, type) {
    var position = -1;
    var removeAt = -1;
    var remove = false;

    sortedList.forEach((v, i) => {
      if (unsortedItem.PercentGain < v.PercentGain && unsortedItem.Symbol != v.Symbol) {
        position = i;
      }

      if (unsortedItem.Symbol == v.Symbol && unsortedItem.PercentGain == v.PercentGain) {
        removeAt = i;
        remove = true;
        GainersHub.gainersRemovalList.push(v.Symbol);
      }
    })

    if (remove) {
      sortedList.splice(removeAt, 1);
    }
    sortedList.splice(position + 1, 0, unsortedItem);
    return sortedList;
  },

};
