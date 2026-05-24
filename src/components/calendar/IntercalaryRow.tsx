import { View, Text, StyleSheet } from 'react-native'
import { IntercalaryNode } from '../../models/calendar'

type Props = {
  node: IntercalaryNode
}

export default function IntercalaryRow({ node }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ☀ {node.title} ☀
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingVertical: 16,
    marginVertical: 12,

    borderRadius: 16,

    backgroundColor: '#f59e0b',

    alignItems: 'center',
  },

  text: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 16,
  },
})
