import { useState, useEffect } from "react"
import { query, collection, onSnapshot, orderBy, where } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";
import useGetUserInfo from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [ transactions, setTransactions ] = useState([])
    const transactionCollectionRef = collection(db, "transactions");
    const {userID} = useGetUserInfo();
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
    })

    const getTransactions = async () => {
        let unsubscribe;
        try{
            
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id
                    docs.push({...data, id});
                    if(data.transactionType === "expense"){
                        totalExpenses += Number(data.transactionAmount);
                    }else{
                        totalIncome += Number(data.transactionAmount);
                    }
                });
                setTransactions(docs);
                let balance = totalIncome - totalExpenses
                setTransactionTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome
                })
            })
            
        }catch(error){
            console.log(error);
            window.alert(error);
        }

        return () => unsubscribe();
    } 
    
    useEffect(() => {
        getTransactions() 
    }, [])
    
    
    return { transactions, transactionTotals };
}