<script setup>
import { useStorageStore } from '../stores/auth/user_storage';
import { useFetchData } from '@/helpers/fetchData'


const storage = useStorageStore();

const fetchData = useFetchData();

console.log(fetchData.getHeader());



</script>

<template>
 test
</template>

