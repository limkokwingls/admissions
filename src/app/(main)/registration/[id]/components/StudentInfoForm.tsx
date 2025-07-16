'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createStudentInfo } from '@/server/student-info/actions';
import {
  religions,
  genders,
  maritalStatuses,
  nextOfKinRelationships,
} from '@/db/schema/students';

type StudentInfoFormData = {
  nationalId: string;
  reference: string;
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  religion: (typeof religions)[number];
  dateOfBirth: string;
  gender: (typeof genders)[number];
  maritalStatus: (typeof maritalStatuses)[number];
  birthPlace: string;
  homeTown: string;
  highSchool: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinRelationship: (typeof nextOfKinRelationships)[number];
};

type Props = {
  studentId: string;
  onBack: () => void;
};

export default function StudentInfoForm({ studentId, onBack }: Props) {
  const [formData, setFormData] = useState<StudentInfoFormData>({
    nationalId: '',
    reference: '',
    name: '',
    email: '',
    phone1: '',
    phone2: '',
    religion: '' as (typeof religions)[number],
    dateOfBirth: '',
    gender: '' as (typeof genders)[number],
    maritalStatus: '' as (typeof maritalStatuses)[number],
    birthPlace: '',
    homeTown: '',
    highSchool: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinRelationship: '' as (typeof nextOfKinRelationships)[number],
  });
  const [errors, setErrors] = useState<Partial<StudentInfoFormData>>({});
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: createStudentInfo,
    onSuccess: () => {
      router.push('/registration/success');
    },
    onError: (error) => {
      console.error('Error creating student info:', error);
    },
  });

  const handleInputChange = (
    field: keyof StudentInfoFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentInfoFormData> = {};

    if (!formData.nationalId) newErrors.nationalId = 'National ID is required';
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone1) newErrors.phone1 = 'Phone number is required';
    if (!formData.religion) newErrors.religion = 'Religion is required';
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus)
      newErrors.maritalStatus = 'Marital status is required';
    if (!formData.birthPlace) newErrors.birthPlace = 'Birth place is required';
    if (!formData.homeTown) newErrors.homeTown = 'Home town is required';
    if (!formData.highSchool) newErrors.highSchool = 'High school is required';
    if (!formData.nextOfKinName)
      newErrors.nextOfKinName = 'Next of kin name is required';
    if (!formData.nextOfKinPhone)
      newErrors.nextOfKinPhone = 'Next of kin phone is required';
    if (!formData.nextOfKinRelationship)
      newErrors.nextOfKinRelationship = 'Next of kin relationship is required';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createMutation.mutate({
        studentId,
        ...formData,
        paid: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                National ID *
              </label>
              <Input
                value={formData.nationalId}
                onChange={(e) =>
                  handleInputChange('nationalId', e.target.value)
                }
                placeholder='Enter your national ID'
                className={errors.nationalId ? 'border-red-500' : ''}
              />
              {errors.nationalId && (
                <p className='mt-1 text-sm text-red-500'>{errors.nationalId}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Reference Number
              </label>
              <Input
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                placeholder='Enter reference number (if any)'
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='Enter your full name'
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Email Address *
              </label>
              <Input
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder='Enter your email address'
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Phone Number 1 *
              </label>
              <Input
                value={formData.phone1}
                onChange={(e) => handleInputChange('phone1', e.target.value)}
                placeholder='Enter your primary phone number'
                className={errors.phone1 ? 'border-red-500' : ''}
              />
              {errors.phone1 && (
                <p className='mt-1 text-sm text-red-500'>{errors.phone1}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Phone Number 2
              </label>
              <Input
                value={formData.phone2}
                onChange={(e) => handleInputChange('phone2', e.target.value)}
                placeholder='Enter your secondary phone number'
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Religion *
              </label>
              <select
                value={formData.religion}
                onChange={(e) => handleInputChange('religion', e.target.value)}
                className={`flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:focus-visible:ring-neutral-300 ${
                  errors.religion ? 'border-red-500' : ''
                }`}
              >
                <option value=''>Select religion</option>
                {religions.map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
              {errors.religion && (
                <p className='mt-1 text-sm text-red-500'>{errors.religion}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Date of Birth *
              </label>
              <Input
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange('dateOfBirth', e.target.value)
                }
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:focus-visible:ring-neutral-300 ${
                  errors.gender ? 'border-red-500' : ''
                }`}
              >
                <option value=''>Select gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className='mt-1 text-sm text-red-500'>{errors.gender}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Marital Status *
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) =>
                  handleInputChange('maritalStatus', e.target.value)
                }
                className={`flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:focus-visible:ring-neutral-300 ${
                  errors.maritalStatus ? 'border-red-500' : ''
                }`}
              >
                <option value=''>Select marital status</option>
                {maritalStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.maritalStatus && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.maritalStatus}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            Location & Education
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Place of Birth *
              </label>
              <Input
                value={formData.birthPlace}
                onChange={(e) =>
                  handleInputChange('birthPlace', e.target.value)
                }
                placeholder='Enter your place of birth'
                className={errors.birthPlace ? 'border-red-500' : ''}
              />
              {errors.birthPlace && (
                <p className='mt-1 text-sm text-red-500'>{errors.birthPlace}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Home Town *
              </label>
              <Input
                value={formData.homeTown}
                onChange={(e) => handleInputChange('homeTown', e.target.value)}
                placeholder='Enter your home town'
                className={errors.homeTown ? 'border-red-500' : ''}
              />
              {errors.homeTown && (
                <p className='mt-1 text-sm text-red-500'>{errors.homeTown}</p>
              )}
            </div>
            <div className='md:col-span-2'>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                High School *
              </label>
              <Input
                value={formData.highSchool}
                onChange={(e) =>
                  handleInputChange('highSchool', e.target.value)
                }
                placeholder='Enter your high school name'
                className={errors.highSchool ? 'border-red-500' : ''}
              />
              {errors.highSchool && (
                <p className='mt-1 text-sm text-red-500'>{errors.highSchool}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Next of Kin Information
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Next of Kin Name *
              </label>
              <Input
                value={formData.nextOfKinName}
                onChange={(e) =>
                  handleInputChange('nextOfKinName', e.target.value)
                }
                placeholder='Enter next of kin full name'
                className={errors.nextOfKinName ? 'border-red-500' : ''}
              />
              {errors.nextOfKinName && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.nextOfKinName}
                </p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Next of Kin Phone *
              </label>
              <Input
                value={formData.nextOfKinPhone}
                onChange={(e) =>
                  handleInputChange('nextOfKinPhone', e.target.value)
                }
                placeholder='Enter next of kin phone number'
                className={errors.nextOfKinPhone ? 'border-red-500' : ''}
              />
              {errors.nextOfKinPhone && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.nextOfKinPhone}
                </p>
              )}
            </div>
            <div className='md:col-span-2'>
              <label className='mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                Relationship *
              </label>
              <select
                value={formData.nextOfKinRelationship}
                onChange={(e) =>
                  handleInputChange('nextOfKinRelationship', e.target.value)
                }
                className={`flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:focus-visible:ring-neutral-300 ${
                  errors.nextOfKinRelationship ? 'border-red-500' : ''
                }`}
              >
                <option value=''>Select relationship</option>
                {nextOfKinRelationships.map((relationship) => (
                  <option key={relationship} value={relationship}>
                    {relationship}
                  </option>
                ))}
              </select>
              {errors.nextOfKinRelationship && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.nextOfKinRelationship}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex gap-4'>
        <Button
          type='button'
          variant='outline'
          onClick={onBack}
          className='flex-1'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
        <Button
          type='submit'
          disabled={createMutation.isPending}
          className='flex-1'
        >
          {createMutation.isPending ? (
            <>
              <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
              Submitting...
            </>
          ) : (
            'Submit Information'
          )}
        </Button>
      </div>
    </form>
  );
}
