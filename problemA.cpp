#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        unordered_map<int,int> m;
        vector<int> v(n);
        for(int i=0;i<n;i++){
            cin>>v[i];
            m[v[i]]++
        }
        for(auto it:m){
            if(it.second>1){
                if(m.find(it.first+1)==m.end()){
                    m[it.first]--;
                    m[it.first+1]++;
                }
                else if(m.find(it.first+1)==1){
                    m[it.first]--;
                    m[it.first+1]++;
                }
            }
        }
        int count=0;
        for(auto it:m){
            count++;
        }
        cout<<count<<endl;
    }
}