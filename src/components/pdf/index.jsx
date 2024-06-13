/* eslint-disable react/prop-types */
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import Button from "../button";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: '150px',
    borderRadius: '8px',
    marginRight: '10px'
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  name: {
    fontSize: '12px',
  },
  employees: {
    fontSize: '12px',
    color: '#FFA500'
  },
  address: {
    fontSize: '12px',
    color: '#615e5e'
  },
  badge: {
    height: '20px',
    paddingRight: '20px',
    paddingLeft: '20px',
    textAlign: 'center',
    verticalAlign: 'sub',
    fontSize: '12px',
    textTransform: 'capitalize',
    borderRadius: '4px',
  },
  active: {
    backgroundColor: '#16C098',
    color: '#008767',
  },
  inactive: {
    backgroundColor: '#FFC5C5',
    color: '#DF0404',
  }
});

// Create Document Component
const MyDocument = ({ data, status }) =>
  data ? (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{status}</Text>
          <Text>Companies In Database</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: "10px", marginBottom: "30px", textAlign: "right" }}>
            Created at {new Date().toString()}
          </Text>
          <View style={styles.sectionBeforeItem}>
            {data.map((item, i) => (
              <View key={i} style={styles.sectionItem}>
                <View style={styles.sectionItem}>
                  <Image src={item.image} style={styles.image} />
                  <View>
                    <Text key={i} style={styles.name}>{item.name}</Text>
                    <Text key={i} style={styles.employees}>{item.employees} employees</Text>
                    <Text key={i} style={styles.address}>{item.address}, {item.country}</Text>                  
                  </View>
                </View>

                <Text key={i} style={{...styles[item.status], ...styles.badge}}>{item.status}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  ) : null;

const Pdf = ({ data, status }) => {
  return (
    <PDFDownloadLink document={<MyDocument data={data()} status={status} />} fileName="dbcompany.pdf">
      <Button label="Create PDF" />
    </PDFDownloadLink>
  );
};

export default Pdf;
