import React from "react";

const page = ({ params }: any) => {
    return (
        <>
            <div className="flex justify-center items-center h-screen ">
                <div className="text-4xl" >
                    this is profile page{" "}
                    <span className="bg-orange-500 text-white-600  p-2 px-4 rounded  ">
                        {params.id}
                    </span>
                </div>
            </div>
        </>
    );
};

export default page;
