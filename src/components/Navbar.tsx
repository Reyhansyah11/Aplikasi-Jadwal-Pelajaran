import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const Navbar = () => {
  return (
    <View className="bg-blue-600 py-4">
      <Text className="text-white text-center text-lg font-bold">Jadwal Pelajaran</Text>
    </View>
  );
};

export default Navbar;
