import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  // Check if there are any items in the cart with quantity > 0
  const hasItems = cartItems && cartItems.length > 0 && cartItems.some(item => item.quantity > 0);

  return (
    <TouchableOpacity
      style={styles.floatingCartButton}
      onPress={() => navigation.navigate('Cart')}
    >
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#87CEEB', '#79C3E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.floatingCartGradient}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </LinearGradient>
        {hasItems && (
          <View style={styles.badge}>
            <View style={styles.badgeInner} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingCartButton: {
    position: 'absolute',
    bottom: 130, 
    right: 20,
    zIndex: 10,
  },
  buttonContainer: {
    position: 'relative',
  },
  floatingCartGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#87CEEB',
    elevation: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  badgeInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff6b6b',
  },
});

export default FloatingCartButton; 