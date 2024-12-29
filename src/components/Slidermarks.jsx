import React from 'react';
import { motion } from 'framer-motion';
import { SiNike } from "react-icons/si";
import { FaWordpressSimple } from "react-icons/fa";
import { SiBmw } from "react-icons/si";
import { SiXdotorg } from "react-icons/si";
import { SiKtm } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiAcer } from "react-icons/si";
import { SiFiat } from "react-icons/si";
const tools = [
    { icon: < SiNike className='text-6xl'/> },
    { icon: < FaWordpressSimple className='text-6xl'/> },
    { icon: < SiBmw  className='text-6xl'/> },
    { icon: < SiXdotorg className='text-6xl'/> },
    { icon: < SiKtm className='text-6xl'/> },
    { icon: < SiAdidas className='text-6xl'/> },
    { icon: < SiAcer className='text-6xl'/> },
    { icon: < SiFiat className='text-6xl'/> },

];

const ToolsCarousel = () => {
    const duplicatedTools = [...tools, ...tools];

    return (
        <div className="relative h-full flex bg-backgroundColorPrimary py-[-20px] mt-[80px]">
            <div className="container max-w-none mx-auto relative flex flex-col my-24">
                <div className="mb-12 text-3xl sm:text-5xl font-BG whitespace-pre-line text-center tracking-tighter">
                 most famous brands 
                </div>
                <div className="relative w-full overflow-hidden">
                    <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-backgroundColorPrimary before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-backgroundColorPrimary after:to-transparent after:filter after:blur-3"></div>
                    <motion.div
                        className="flex w-[1225px] h-[150px]"
                        animate={{
                            x: ['0%', '-100%'],
                            transition: {
                                ease: 'linear',
                                duration: 15,
                                repeat: Infinity,
                            }
                        }}
                    >
                        {duplicatedTools.map((tool, index) => (
                            <div key={index} className="flex-shrink-0" style={{ width: `${100 / tools.length}%` }}>
                                <div className="flex items-center justify-center h-full">
                                    {tool.icon}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ToolsCarousel;
