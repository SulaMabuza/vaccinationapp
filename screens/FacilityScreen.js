import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
	ArrowLeftIcon,
	ChevronRightIcon,
	StarIcon,
	MapPinIcon,  	
		} from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import VaccineRow from "../components/VaccineRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from 'react-redux';
import { setFacility } from '../features/facilitySlice';



const FacilityScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const {
		params:{
				id,
				imgUrl,
				title,
				rating,
				genre,
				address,
				phonenumber,
				emailaddress,
				short_description,
				vaccines,
				long,
				lat,
				aboutvaccination,
				vaccinationschedule
			},

	} = useRoute();

	useEffect(() => {
		dispatch(
			setFacility({
				id,
				imgUrl,
				title,
				rating,
				genre,
				address,
				phonenumber,
				emailaddress,
				short_description,
				vaccines,
				long,
				lat,
				aboutvaccination,
				vaccinationschedule
			})
			);

	}, [])


	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);


	return(
		<>
		<BasketIcon/>
		<ScrollView>
			<View className='relative'>
				<Image 
					source={{
						uri: urlFor(imgUrl).url(),
					}}
					className = "w-full h-56 bg-gray-300 p-4"
				/>
				<TouchableOpacity 
						onPress = {navigation.goBack}
						className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
					<ArrowLeftIcon size={20} color="#00CCBB"/>
				</TouchableOpacity>
			</View>
			<View className='bg-white'>
				<View className="px-4 pt-4">
					<Text className="text-3xl font-bold">{title}</Text>
					<View className="flex-row space-x-2 my-1">
						<View className="flex-row items-center space-x-1">
							<StarIcon color="green" opacity={0.5} size={22}/>
							<Text className="text-xs text-gray-500">
								<Text className="text-green-500">{rating}</Text> · {genre}
							</Text>
						</View>

						<View className="flex-row items-center space-x-1">
							<MapPinIcon color="gray" opacity={0.4} size={22}/>
							<Text className="text-xs text-gray-500">
								{address}
							</Text>
						</View>
					</View>
 
					<Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
				</View>

				<TouchableOpacity
					className="flex-row items-center space-x-2 p-4 border-y border-gray-300"
					onPress={() => 
						navigation.navigate("AboutVaxx", {
							aboutVaxx: aboutvaccination,
							facilityName: title,
						})
					}>
					<QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
					<Text className="pl-2 flex-1 text-md font-bold">
						What is a vaccine?
					</Text>
					<ChevronRightIcon color="#00CCBB"/>
				</TouchableOpacity>
			</View>

			<View className='pb-36'>
				<Text className="px-4 pt-6 mb-3 font-bold text-xl">Catalog</Text>
					{/*vaccine rows*/}
				{vaccines.map((vaccine) => (
						<VaccineRow
							key={vaccine._id}
							id={vaccine._id}
							name={vaccine.name}
							description={vaccine.short_description}
							price={vaccine.price}
							image={vaccine.image}
						/>
					))}
			</View>
		</ScrollView>
		</>
		)
}

export default FacilityScreen;