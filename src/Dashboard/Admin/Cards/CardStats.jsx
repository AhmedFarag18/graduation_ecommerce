import React from "react";

export default function CardStats({
    statSubtitle,
    statTitle,
    statIconName,
    statIconColor,
    statDescripiron
}) {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow hover:shadow-2xl transition duration-200">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-main-color uppercase font-bold text-xs">
                                {statSubtitle}
                            </h5>
                            <span className="font-semibold text-2xl text-gray-600">
                                {statTitle}
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={
                                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                                    statIconColor
                                }
                            >
                                {statIconName}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="whitespace-nowrap">{statDescripiron}</span>
                    </p>
                </div>
            </div>
        </>
    );
}