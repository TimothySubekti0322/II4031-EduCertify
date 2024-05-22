import React from 'react';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

interface ProfileCardProps {
  imageSrc: string;
  name: string;
  studentNumber: string;
  linkedin: string;
  github: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageSrc, name, studentNumber, linkedin, github }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={imageSrc} alt={`${name} photo`} className="w-28 h-28 rounded-full object-cover" />
      <p className="mt-1">{name}</p>
      <p>{studentNumber}</p>
      <div className="flex flex-row gap-1 items-center">
        <FaGithubSquare />
        <p>{github}</p>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <FaLinkedin />
        <p>{linkedin}</p>
      </div>

    </div>
  );
};

export default ProfileCard;
