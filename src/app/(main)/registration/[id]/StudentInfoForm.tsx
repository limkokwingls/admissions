'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createStudentInfo } from '@/server/student-info/actions';
import {
  religions,
  genders,
  maritalStatuses,
  nextOfKinRelationships,
} from '@/db/schema/students';
import { getStudent } from '@/server/students/actions';

type Student = NonNullable<Awaited<ReturnType<typeof getStudent>>>;

const formSchema = z.object({
  nationalId: z.string().min(1, 'National ID is required'),
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone1: z.string().min(1, 'Phone number is required'),
  phone2: z.string().optional(),
  religion: z.enum(religions, {
    message: 'Religion is required',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(genders, {
    message: 'Gender is required',
  }),
  maritalStatus: z.enum(maritalStatuses, {
    message: 'Marital status is required',
  }),
  birthPlace: z.string().min(1, 'Birth place is required'),
  homeTown: z.string().min(1, 'Home town is required'),
  highSchool: z.string().min(1, 'High school is required'),
  nextOfKinName: z.string().min(1, 'Next of kin name is required'),
  nextOfKinPhone: z.string().min(1, 'Next of kin phone is required'),
  nextOfKinRelationship: z.enum(nextOfKinRelationships, {
    message: 'Next of kin relationship is required',
  }),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  student: Student;
  onBack: () => void;
};

export default function StudentInfoForm({ student, onBack }: Props) {
  const router = useRouter();
  const { studentInfo: info } = student;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationalId: info?.nationalId || '',
      name: info?.name || '',
      email: info?.email || '',
      phone1: info?.phone1 || '',
      phone2: info?.phone2 || '',
      religion: info?.religion || '',
      dateOfBirth: info?.dateOfBirth || '',
      gender: info?.gender || '',
      maritalStatus: info?.maritalStatus || '',
      birthPlace: info?.birthPlace || '',
      homeTown: info?.homeTown || '',
      highSchool: info?.highSchool || '',
      nextOfKinName: info?.nextOfKinName || '',
      nextOfKinPhone: info?.nextOfKinPhone || '',
      nextOfKinRelationship: info?.nextOfKinRelationship || '',
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: FormData) => {
      return createStudentInfo(student.id, {
        ...data,
        studentId: student.id,
      });
    },
    onSuccess: () => {
      router.push('/registration/success');
    },
    onError: (error) => {
      console.error('Error creating student info:', error);
    },
  });

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='nationalId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='religion'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select religion' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {religions.map((religion) => (
                          <SelectItem key={religion} value={religion}>
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maritalStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select marital status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='birthPlace'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='homeTown'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Town</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='highSchool'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>High School</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='nextOfKinName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next of Kin Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nextOfKinPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next of Kin Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nextOfKinRelationship'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select relationship' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nextOfKinRelationships.map((relationship) => (
                          <SelectItem key={relationship} value={relationship}>
                            {relationship}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
    </Form>
  );
}
