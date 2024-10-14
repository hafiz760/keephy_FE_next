import React from 'react';
import PlusIcon2 from '@/assets/icons/PlusIcon2';
import ImportIcon from '@/assets/icons/ImportIcon';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function Card() {
  const params = useParams();
 
  const cardData = [
    {
      title: 'Start from Scratch',
      description: 'Build from a list of available content types',
      icon: <PlusIcon2 />,
      link: `/create-form/scratch-form`,
    },
    {
      title: 'Import questions',
      description: 'Choose from a list of pre-made templates',
      icon: <ImportIcon />,
      link: `/create-form/import-questions`,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center h-[calc(100%-100px)] gradient-bg px-4 md:px-0">
      {cardData.map((card, index) => (
        <Link href={card.link} key={index} passHref>
          <div
            className="bg-white shadow-[0px_0px_60px_30px_#00000008] rounded-xl overflow-hidden p-6 md:w-80 lg:w-96 transition-colors duration-300 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-center items-center px-6 py-4">
              {card.icon}
            </div>
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-xl mb-2">{card.title}</div>
              <p className="text-gray-700">{card.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
