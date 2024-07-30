import {
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import PasswordSchema from './validations/passwordSchema';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
    const numbersList = '0123456789';
    const symbolsList = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseList;
    }

    if (lowerCase) {
      characterList += lowerCaseList;
    }

    if (numbers) {
      characterList += numbersList;
    }

    if (symbols) {
      characterList += symbolsList;
    }

    setPassword(createPassword(characterList, passwordLength));
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }

    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setUpperCase(false);
    setLowerCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={ values => {
              console.log(values)
              generatePassword(parseInt(values.passwordLength))
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleReset
            }) => (
              <>  
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Password Length</Text>
                    <TextInput 
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Enter Password Length'
                      keyboardType='numeric'
                    >
                    </TextInput>
                  </View>
                </View> 
                {touched.passwordLength && errors.passwordLength && (
                  <View>
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  </View>
                )}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Lowercase</Text>
                    <BouncyCheckbox 
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor='#4630EB'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Uppercase</Text>
                    <BouncyCheckbox 
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor='#4630EB'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Numbers</Text>
                    <BouncyCheckbox 
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor='#4630EB'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Include Symbols</Text>
                    <BouncyCheckbox 
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor='#4630EB'
                    />
                  </View>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryButton}
                    onPress={handleSubmit as any}
                  >
                    <Text style={styles.btnText}>
                      Generate Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={
                      () => { 
                        handleReset()
                        resetPassword()
                      }
                    }
                  >
                    <Text style={styles.btnText}>Reset</Text>
                  </TouchableOpacity>  
                </View>  
              </>
            )}
          </Formik>
          {
            isPassGenerated ? (
              <View style={styles.generatedPasswordContainer}>
                <Text style={styles.generatedPasswordText}>Result: </Text>
                <Text 
                  selectable={true} 
                  style={styles.generatedPasswordText}
                >{password}</Text>
              </View>
            ) : null
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e2e2e2',
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  inputColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    paddingHorizontal: 10,
    maxWidth: 200,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#8e8e8e',
    marginTop: 5
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    gap: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginLeft: 10
  },
  primaryButton: {
    backgroundColor: '#5550d4',
    padding: 10,
    width: 180,
    borderRadius: 5,
    
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#757575',
    width: 100
  },
  generatedPasswordContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  },
  generatedPasswordText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center'
  }
});
