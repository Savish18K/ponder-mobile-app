import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// App Theme Colors (University of Sydney Brand Guidelines)
const COLORS = {
  maroon: '#800000',
  white: '#FFFFFF',
  lightGrey: '#F5F5F5',
  darkGrey: '#333333',
  green: '#2E8B57',
  orange: '#FF8C00',
  lightMaroon: '#FADBD8',
  greyText: '#777777'
};

// --- 1. SPLASH SCREEN WITH ANIMATION ---
const SplashScreen = ({ onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ]).start(() => {
      setTimeout(onFinish, 1200);
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: fadeAnim, alignItems: 'center' }}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>👨‍🎓💼</Text>
        </View>
        <Text style={styles.splashTitle}>PONDER</Text>
        <Text style={styles.splashSubtitle}>MOBILE APP</Text>
        <Text style={styles.splashTagline}>Connecting Talents Across Universities in Australia</Text>
      </Animated.View>
    </View>
  );
};

// --- 2. AUTHENTICATION SCREEN (LOGIN & REGISTER) ---
const AuthScreen = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');

  const handleAuth = () => {
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    // Simulate authentication
    onLoginSuccess();
  };

  return (
    <View style={styles.authContainer}>
      <View style={styles.authCard}>
        <Text style={styles.authTitle}>{isSignUp ? 'Create Profile' : 'Sign In'}</Text>
        <Text style={styles.authSubtitle}>Ponder Secondment Platform</Text>

        {isSignUp && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Current University"
              value={university}
              onChangeText={setUniversity}
              placeholderTextColor="#999"
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="University Email (e.g., @sydney.edu.au)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        {!isSignUp && (
          <TouchableOpacity style={styles.biometricBtn}>
            <Text style={styles.biometricText}>Use Fingerprint / Face ID 🔐</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.authMainBtn} onPress={handleAuth}>
          <Text style={styles.authMainBtnText}>{isSignUp ? 'Register & Register' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.switchAuthBtn}>
          <Text style={styles.switchAuthText}>
            {isSignUp ? 'Already have an account? Sign In' : "New to Ponder? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- 3. HOME SCREEN ---
const HomeScreen = ({ setRole, currentRole, onLogout }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Ponder</Text>
      <Text style={styles.subTagline}>Connecting Talents Across Universities in Australia</Text>
    </View>

    <View style={styles.roleContainer}>
      <Text style={styles.sectionHeading}>Select Your Role</Text>

      <TouchableOpacity
        style={[styles.roleTile, currentRole === 'applicant' ? styles.activeRoleTile : styles.inactiveRoleTile]}
        onPress={() => setRole('applicant')}
      >
        <Text style={styles.tileText}>Applicants (Job Seekers)</Text>
        <Text style={styles.tileSubtext}>Browse secondments & upgrade career modules</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleTile, currentRole === 'university' ? styles.activeRoleTile : styles.inactiveRoleTile]}
        onPress={() => setRole('university')}
      >
        <Text style={styles.tileText}>Universities (Job Posters)</Text>
        <Text style={styles.tileSubtext}>View candidates, track smart matching & post jobs</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
      <Text style={styles.logoutBtnText}>Logout from App</Text>
    </TouchableOpacity>
  </View>
);

// --- 4. BROWSE SCREEN ---
const BrowseScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.pageHeading}>Browse Secondments</Text>

    <View style={styles.filterTabs}>
      <TouchableOpacity style={[styles.tab, styles.activeTab]}>
        <Text style={styles.activeTabText}>By Job Area</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>By University</Text>
      </TouchableOpacity>
    </View>

    <TextInput
      style={styles.searchBar}
      placeholder="Search by Job Title or Keywords"
      placeholderTextColor="#999"
    />

    <Text style={styles.sectionHeading}>Popular Job Areas</Text>
    <View style={styles.tagsContainer}>
      {['Finance', 'Research grants management', 'Legal', 'IT', 'Marketing', 'Student Services'].map(area => (
        <View key={area} style={styles.tag}>
          <Text style={styles.tagText}>{area}</Text>
        </View>
      ))}
    </View>

    <Text style={styles.sectionHeading}>Recent Secondments</Text>
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>Faculty Business Partner – AI Ethics</Text>
      <Text style={styles.jobDetails}>University of Sydney</Text>
      <Text style={styles.jobDetails}>Full-time, 6 months</Text>
      <TouchableOpacity style={styles.applyBtn}><Text style={styles.applyBtnText}>Apply</Text></TouchableOpacity>
    </View>
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>Senior Finance Manager - Finance Operations</Text>
      <Text style={styles.jobDetails}>University of Sydney</Text>
      <Text style={styles.jobDetails}>Fixed-term until October 2026</Text>
      <TouchableOpacity style={styles.applyBtn}><Text style={styles.applyBtnText}>Apply</Text></TouchableOpacity>
    </View>
  </ScrollView>
);

// --- 5. APPLICATIONS / CANDIDATES SCREEN ---
const ApplicationsScreen = ({ role }) => {
  if (role === 'university') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.pageHeading}>Smart Matching Dashboard</Text>
        <Text style={styles.infoText}>Profiles scoring 80% or higher match are automatically flagged for review.</Text>

        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Applicant: Kasun Perera</Text>
          <Text style={styles.jobDetails}>Applied for: Faculty Business Partner – AI Ethics</Text>
          <Text style={[styles.status, { color: COLORS.green }]}>AI Smart Match Score: 87% (Highly Recommended)</Text>
        </View>

        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Applicant: Sarah Jenkins</Text>
          <Text style={styles.jobDetails}>Applied for: Senior Finance Manager</Text>
          <Text style={[styles.status, { color: COLORS.orange }]}>AI Smart Match Score: 81% (Flagged for Review)</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>My Applications</Text>
      <Text style={styles.infoText}>Profiles scoring 80% or higher match are flagged for employers.</Text>

      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>Faculty Business Partner - AI Ethics</Text>
        <Text style={[styles.status, { color: COLORS.orange }]}>Status: Pending Review</Text>
      </View>

      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>Senior Accountant - Compliance and Reporting</Text>
        <Text style={[styles.status, { color: COLORS.green }]}>Status: Interview Scheduled</Text>
      </View>
    </View>
  );
};

// --- 6. TRAINING HUB SCREEN ---
const TrainingScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.pageHeading}>🎯 Training Hub – Career Modules</Text>

    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>📘 GST & FBT Basics</Text>
      <TouchableOpacity><Text style={styles.linkText}>→ [Start Module]</Text></TouchableOpacity>
    </View>

    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>📄 CV Writing Skills</Text>
      <TouchableOpacity><Text style={styles.linkText}>→ [Download Guide] | [Watch Video ▶️]</Text></TouchableOpacity>
    </View>

    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>🎤 Job Interview Training</Text>
      <TouchableOpacity><Text style={styles.linkText}>→ [Practice Questions] | [Video Session ▶️]</Text></TouchableOpacity>
    </View>

    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>🔗 LinkedIn Profile Setup</Text>
      <TouchableOpacity><Text style={styles.linkText}>→ [External Link]</Text></TouchableOpacity>
    </View>
    <Text style={styles.infoText}>* Certificates available after completion</Text>
  </ScrollView>
);

// --- MAIN NAVIGATION ---
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('applicant'); // Default dashboard role

  if (!isAppReady) {
    return <SplashScreen onFinish={() => setIsAppReady(true)} />;
  }

  if (!isLoggedIn) {
    return <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.maroon,
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: COLORS.maroon },
          headerTintColor: COLORS.white,
        }}
      >
        <Tab.Screen name="Home" options={{ tabBarIcon: () => <Text>🏠</Text> }}>
          {props => <HomeScreen {...props} setRole={setRole} currentRole={role} onLogout={() => setIsLoggedIn(false)} />}
        </Tab.Screen>
        <Tab.Screen name="Browse" component={BrowseScreen} options={{ tabBarIcon: () => <Text>🔍</Text> }} />
        <Tab.Screen name={role === 'university' ? "Candidates" : "Applications"} options={{ tabBarIcon: () => <Text>📄</Text> }}>
          {props => <ApplicationsScreen {...props} role={role} />}
        </Tab.Screen>
        <Tab.Screen name="Training Hub" component={TrainingScreen} options={{ tabBarIcon: () => <Text>📚</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.maroon,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 50,
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
  splashSubtitle: {
    fontSize: 24,
    color: COLORS.darkGrey,
    marginBottom: 20,
  },
  splashTagline: {
    fontSize: 16,
    color: COLORS.maroon,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  authContainer: {
    flex: 1,
    backgroundColor: COLORS.maroon,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authCard: {
    backgroundColor: COLORS.white,
    width: '100%',
    maxWidth: 400,
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.maroon,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 14,
    color: COLORS.greyText,
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
    fontSize: 15,
    color: COLORS.darkGrey,
  },
  biometricBtn: {
    alignItems: 'center',
    marginBottom: 15,
  },
  biometricText: {
    color: COLORS.maroon,
    fontWeight: '600',
  },
  authMainBtn: {
    backgroundColor: COLORS.maroon,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  authMainBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchAuthBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  switchAuthText: {
    color: COLORS.greyText,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.maroon,
  },
  subTagline: {
    fontSize: 16,
    color: COLORS.darkGrey,
    textAlign: 'center',
  },
  roleContainer: {
    marginTop: 10,
  },
  roleTile: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
  },
  activeRoleTile: {
    backgroundColor: COLORS.maroon,
    borderColor: COLORS.maroon,
  },
  inactiveRoleTile: {
    backgroundColor: COLORS.white,
    borderColor: '#CCC',
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
  activeRoleTile: {
    backgroundColor: COLORS.maroon,
  },
  tileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tileSubtext: {
    fontSize: 12,
    marginTop: 5,
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginBottom: 20,
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: COLORS.maroon,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  tabText: {
    color: COLORS.darkGrey,
  },
  searchBar: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginBottom: 10,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: COLORS.lightMaroon,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: COLORS.maroon,
    fontWeight: '500',
  },
  jobCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.maroon,
    marginBottom: 5,
  },
  jobDetails: {
    color: 'gray',
    marginBottom: 5,
  },
  applyBtn: {
    backgroundColor: COLORS.orange,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: 100,
  },
  applyBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoText: {
    color: 'gray',
    marginBottom: 15,
    fontStyle: 'italic',
    fontSize: 13,
  },
  linkText: {
    color: '#0066CC',
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});

