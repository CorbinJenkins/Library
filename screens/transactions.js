import * as React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { askAsync } from 'expo-permissions';
import firebase from 'firebase';
import db from '../config.js'

export default class Transactions extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            // scannedData:"",
            buttonState:"normal",
            scannedBookID:"",
            scannedStudentID:"",
            transactionMessage:""
        }
    }
    getCameraPermission=async(ID)=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:ID,
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="BookId"){
            this.setState({
                scanned:true,
                scannedBookID:data,
                buttonState:"normal"
            })
        }
        else if(buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedStudentID:data,
                buttonState:"normal"
            })
        }
        
        
    }
    handleTransaction=async()=>{
        var transactionMessage=null
        db.collection('books').doc(this.state.scannedBookID).get()
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState!=="normal" && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}/>
            );
        }
        else if(buttonState==="normal"){
        
        return(

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View>
                    <Image source={require("../assets/booklogo.jpg")}
                    style={{width:200,height:200}}/>
                    <Text style={styles.Title}>
                        Library App!
                    </Text>
                </View>
                <View style={{flexDirection:'row',margin:20,}}>
                    <TextInput style={styles.inputBox}
                    placeholder='Book ID'
                    value={this.state.scannedBookID}
                    />
                    <TouchableOpacity style={styles.scanButton} onPress={()=>{
                        this.getCameraPermission('BookId')
                    }}>
                        <Text style={styles.buttonText}>
                            SCAN
                        </Text>
                    </TouchableOpacity>
                </View>

               {/* //<Text style={{fontSize:15,textDecorationLine:"underline"}}>
                  //{hasCameraPermission===true?this.state.scannedData:"requestCameraPermissions"}
               //</Text> */}

               <View style={{flexDirection:'row',margin:20,}} onPress={()=>{
                        this.getCameraPermission('StudentId')
                    }}>
                    <TextInput style={styles.inputBox}
                    placeholder=' Student ID'
                    value={this.state.scannedStudentID}
                    />
                    <TouchableOpacity style={styles.scanButton}>
                        <Text style={styles.buttonText}>
                            SCAN
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{backgroundColor="blue",width:100,height:50}} onPress={async()=>{
                    var transactionMessage= await this.handleTransaction()
                }}>
                    <Text style={{textAlign:'center',fontSize:20,color:'green',padding:10}}>
                        Submit
                    </Text>

                </TouchableOpacity>
            
                {/* <TouchableOpacity style={styles.QRButton} onPress={this.getCameraPermission}>
                    <Text style={{fontSize:20}}>
                        Scan The QR Code
                    </Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}
} 
const styles=StyleSheet.create({
    QRButton:{
        backgroundColor:"orange",
        padding:10,
        borderRadius:20,
        margin:10,
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        borderRightWidth:0
    },
    scanButton:{
        backgroundColor:'green',
        width:55,
        borderWidth:1.5,
        borderLeftWidth:0,

    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10
    },
    Title:{
        textAlign:'center',
        fontSize:40,

    }
})
