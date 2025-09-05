package com.email.writer.app;

public class test {
        // Method must be static and return int[] for indices
        public static int[] twoSum(int[] nums, int target) {
            Map<Integer, Integer> map = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {

                int complement = target - nums[i];
                if (map.containsKey(complement)) {
                    // Return the two indices as an array
                    System.out.println(map.get(complement), i);
                    return new int[]{map.get(complement), i};
                }
                map.put(nums[i], i);
                System.out.println(map);
            }
            System.out.println(map);
            // If no solution exists, return an empty array
            return new int[0];
        }

        public static void main(String[] args) {
            int[] nums = {2, 7, 11, 15};
            int target = 9;

            // Call the method correctly
            int[] result = twoSum(nums, target);

            // Print the result
            if (result.length == 0) {
                System.out.println("No solution found");
            } else {
                System.out.println(Arrays.toString(result)); // [0, 1]
            }
        }
    }

}
