/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (diff === nums[j]) return [i, j];
    }
  }
};

var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const key = target - nums[i];
    if (map.has(key)) return [map.get(key), i];
    map.set(nums[i], i);
  }
};
