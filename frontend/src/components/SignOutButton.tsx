// import { useMutation } from "react-query";
// import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
// import { useQueryClient } from "react-query";

// const SignOutButton = () => {
//     const queryClient = useQueryClient();

//     const {showToast} = useAppContext();

//     const mutation = useMutation (apiClient.signOut, {
//         onSuccess: async () => {
//             await queryClient.invalidateQueries("validateToken");
//             showToast ({message: "Signed out successfully", type: "SUCCESS"});

//         }, onError: (error:Error) => {
//             showToast ({message: error.message, type: "ERROR"});

//         },
//     });

//     const handleClick = () => {
//         mutation.mutate();
    
//     }

//     return (
//         <button onClick={handleClick} className=" text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
//     );



// };


// export default SignOutButton;


import { useMutation } from "react-query";
import * as apiClient from "../api-client"; // Ensure this path is correctly pointing to where your api-client.ts is located.
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "react-query";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            showToast({ message: "Signed out successfully", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
    );
};

export default SignOutButton;
