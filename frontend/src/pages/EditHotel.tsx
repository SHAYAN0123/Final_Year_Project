import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {
    const {hotelId} = useParams();
    const {showToast} = useAppContext ();


    const {data: hotel} = useQuery(
    "fetchMyHotelById", () =>
    apiClient.fetchMyHotelById(hotelId || ''),
    {
        enabled: !!hotelId,
    }

);

const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
        showToast ({message: "Venue Saved!" , type: "SUCCESS"});
    },
    onError: () => {
        showToast ({message: "Error Saving Venue", type: "ERROR"});
    },
});

const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
};
return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;



};

export default EditHotel;