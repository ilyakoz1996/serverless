'use client'

import React, { useState } from 'react';

import CreatableSelect from 'react-select/creatable';


export default function MultipleInput ({tags, setTags}: any) {

    return (
            <CreatableSelect 
            className='w-full'
            placeholder="Choose or create categories"
            value={tags}
            onChange={(newValue: any) => {
                setTags(newValue)
            }}
              classNames={{
                container: () => 'text-sm',
                control: (state) =>
                  state.isFocused ? 'red' : 'blue',
                  menuList: () => 'bg-zinc-900 border border-zinc-700/50 rounded-lg text-sm'
              }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: "#27272a", // zinc-800
                    primary75: "#27272a", // zinc-800
                    primary50: "#27272a", // zinc-800
                    primary25: "#27272a", // zinc-800
                    danger: "#ef4444", // red-500
                    dangerLight: "#27272a", //red-400
                    neutral0: "#09090b", // zinc-950
                    neutral5: "#49DE80", // green-400
                    neutral10: "#18181b", // zinc-900
                    neutral20: "#27272a", // zinc-800
                    neutral30: "#3f3f46", // green-400
                    neutral40: "#d4d4d4", // green-400
                    neutral50: '#737373', // neutral-500
                    neutral60: "#27272a",
                    neutral80: "#d4d4d4", // neutral-300
                    neutral90: 'red'
                },
                })}
            isMulti 
            />
    )

}