import { SafeAreaView, StyleSheet } from 'react-native'

import MonthView from '../components/calendar/MonthView'

import { buildMonth } from '../engine/calendar/buildMonth'

export default function HomeScreen() {
  const nodes = buildMonth()

  return (
    <SafeAreaView style={styles.container}>
      <MonthView nodes={nodes} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 24,
  },
})
